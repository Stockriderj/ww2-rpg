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
import {randomNumber} from "./utils/helpers";
import {BoltAction, Pistol} from "./game-scripts/items/guns";
import styled from "styled-components";
import {ScavengeButton} from "./game-ui/ScavengeButton";

preloadSounds();

const Container = styled.main`
  max-width: 90vw;
  margin: 0 auto;
`;

function App() {
  const {player, scavengeTimer, dispatch} = usePlayer();
  const [enemy, setEnemy] = useState(new Character({meleeDamage: 10})); // Example enemy

  useEffect(() => {
    const tick = setInterval(() => dispatch({type: "tick"}), 1000);

    return () => clearInterval(tick);
  }, []);

  const handleBattle = weapon => {
    const {updatedEnemy, playerWon} = battleRound(player, enemy, weapon);

    dispatch({type: "update"});
    setEnemy(updatedEnemy); // Update enemy state

    if (playerWon) {
      player.inventory.forEach(item => {
        if (item?.type === "Gun") {
          const newAmmo = randomNumber(0, 10);
          if (newAmmo === 0) return;
          toast(
            `+${newAmmo} ${item.name} Ammo - You found some ammo in the enemy's bag.`
          );
          item.ammunition += newAmmo;
        }
      });
      if (randomNumber(1, 5) === 1) {
        player.addItem("Medkit", 1);
        toast(
          "+1 Medkit - You found an unused medkit attached to the enemy's corpse."
        );
      }

      let enemyWeaponNum = randomNumber(1, 5);
      let enemyWeapon =
        enemyWeaponNum === 5
          ? new BoltAction({quantity: 1})
          : enemyWeaponNum <= 4 && enemyWeaponNum >= 2
          ? new Pistol({quantity: 1})
          : null;
      setEnemy(
        new Character({
          meleeDamage: player.xp / 100,
          primaryWeapon: enemyWeapon,
        })
      );
    }
  };

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
                <Button
                  onClick={() => {
                    medkit.actions.use.run({player});
                    dispatch({type: "update"});
                  }}
                >
                  Use medkit
                </Button>
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
