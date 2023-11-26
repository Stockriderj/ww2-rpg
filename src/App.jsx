import React, {useEffect, useState} from "react";
import GlobalStyles from "./styles/GlobalStyles";
import toast, {Toaster} from "react-hot-toast";

// Components
import HUD from "./game-ui/HUD";
import Inventory from "./game-ui/Inventory";
import Button from "./game-ui/Button";

// Game scripts
import battleRound from "./game-scripts/battle";
import {Character} from "./game-scripts/characters";
import {usePlayer} from "./context/PlayerContext";
import preloadSounds from "./game-scripts/preload-sounds";
import {randomNumber, stackItems} from "./utils/helpers";
import {BoltAction, Pistol} from "./game-scripts/items/inventoryItems";
import styled from "styled-components";
import {ScavengeButton} from "./game-ui/ScavengeButton";

preloadSounds();

const Container = styled.main`
  max-width: 90vw;
  margin: 0 auto;
`;

function App() {
  const {player, dispatch} = usePlayer();
  const [enemy, setEnemy] = useState(new Character({meleeDamage: 10})); // Example enemy

  useEffect(() => {
    const tick = setInterval(() => dispatch({type: "tick"}), 1000);

    return () => clearInterval(tick);
  }, []);

  const handleBattle = weapon => {
    const {updatedEnemy, playerWon} = battleRound(player, enemy, weapon);
    dispatch({type: "update"});

    setEnemy(updatedEnemy);

    if (playerWon) {
      let battleRewards = [];
      let rewardNames = [];

      player.inventory.forEach(item => {
        if (item?.type === "Gun") {
          const newAmmo = randomNumber(0, 10);
          if (newAmmo === 0) return;
          battleRewards.push({
            type: "ammo",
            name: item.name,
            quantity: newAmmo,
          });
          rewardNames.push(`x${newAmmo} ${item.name} Ammo`);
        }
      });

      if (randomNumber(1, 5) === 1) {
        battleRewards.push({name: "Medkit", quantity: 1});
        rewardNames.push("x1 Medkit");
      }

      const {stackedText} = stackItems(
        rewardNames.map(name => [name]),
        false
      );

      battleRewards.forEach(item => {
        item?.type === "ammo"
          ? player.addAmmo(item.name, item.quantity)
          : player.addItem(item.name, item.quantity);
      });
      toast(`You looted ${stackedText} from the enemy!`);
      dispatch({type: "update"});

      let enemyWeapon = determineEnemyWeapon(randomNumber(1, 5));

      setEnemy(
        new Character({
          meleeDamage: player.xp / 100,
          primaryWeapon: enemyWeapon,
        })
      );
    }
  };

  function determineEnemyWeapon(enemyWeaponNum) {
    switch (enemyWeaponNum) {
      case 5:
        return new BoltAction({quantity: 1});
      case 2:
      case 3:
      case 4:
        return new Pistol({quantity: 1});
      default:
        return null;
    }
  }

  const medkit = player.inventory.filter(item => item.name === "Medkit")[0];

  return (
    <>
      <GlobalStyles />

      <div>
        <HUD />
        <Container>
          {player.health === 0 ? (
            <h1>You died. refresh the page to restart</h1>
          ) : (
            <>
              <h1>WW2 Text Adventure Game</h1>
              <Inventory />
              <p>
                Enemy: {enemy.health} HP | Weapon:{" "}
                {enemy.primaryWeapon?.name || "Bare hands"}
              </p>
              <div>
                <Button onClick={() => handleBattle("primaryWeapon")}>
                  Attack with {player.primaryWeapon?.name || "bare hands"}
                </Button>
                {player?.secondaryWeapon && (
                  <Button onClick={() => handleBattle("secondaryWeapon")}>
                    Attack with {player.secondaryWeapon.name}
                  </Button>
                )}
                {medkit && (
                  <Button
                    onClick={() => {
                      medkit.actions.use.run({player});
                      dispatch({type: "update"});
                    }}
                  >
                    Use medkit
                  </Button>
                )}
                <ScavengeButton />
              </div>
            </>
          )}

          <p style={{position: "absolute", bottom: 0}}>
            &copy; 2023 stockriderj &lt;3
          </p>
        </Container>
      </div>

      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  );
}

export default App;
