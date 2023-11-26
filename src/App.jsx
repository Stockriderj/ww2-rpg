import React, {useEffect, useState} from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import toast, {Toaster} from "react-hot-toast";

// Components
import HUD from "./game-ui/HUD";
// import Inventory from "./game-ui/Inventory";
import Inventory from "./game-ui/Inventory";
import Button from "./game-ui/Button";
import {ExploreButton} from "./game-ui/ExploreButton";

// Game scripts
import battleRound from "./game-scripts/battle";
import {Character} from "./game-scripts/characters";
import {usePlayer} from "./context/PlayerContext";
import preloadSounds from "./game-scripts/preload-sounds";
import {randomNumber, stackItems} from "./utils/helpers";

preloadSounds();

const Container = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  padding: 3.6rem;
  margin-top: 3%;
`;

function App() {
  const {player, dispatch} = usePlayer();
  const [enemy, setEnemy] = useState(null); // Example enemy

  useEffect(() => {
    const tick = setInterval(() => dispatch({type: "tick"}), 1000);

    return () => clearInterval(tick);
  }, []);
  new Character({meleeDamage: 10});

  // battle stuff
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
              {/* <Inventory /> */}
              <Inventory />
              {/* more temporary enemy stuff */}
              {enemy && (
                <p>
                  Enemy: {enemy.health} HP | Weapon:{" "}
                  {enemy.primaryWeapon?.name || "Bare hands"}
                </p>
              )}
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
                <ExploreButton enemy={enemy} setEnemy={setEnemy} />
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
