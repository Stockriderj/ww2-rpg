import React, {useState} from "react";
import GlobalStyles from "./styles/GlobalStyles";
import toast, {Toaster} from "react-hot-toast";

// Components
import HUD from "./game-ui/HUD";
import Inventory from "./game-ui/Inventory";
import Button from "./game-ui/Button";

// Game scripts
import {battleRound} from "./game-scripts/battle";
import {Character} from "./game-scripts/characters";
import {usePlayer} from "./context/PlayerContext";
import preloadSounds from "./game-scripts/preload-sounds";
import {randomNumber} from "./utils/helpers";

preloadSounds();

function App() {
  const {inventory, setInventory, player, setPlayer, updatePlayer} =
    usePlayer();
  const [enemy, setEnemy] = useState(
    new Character({meleeDamage: 10}) // , weapon: new Pistol(1)
  ); // Example enemy

  const [showInventory, setShowInventory] = useState(false);

  const handleBattle = () => {
    const {updatedPlayer, updatedEnemy, playerWon} = battleRound(
      player,
      enemy,
      "shoot"
    );

    setInventory([...inventory]); // Update state to reflect ammo change
    updatePlayer();
    setEnemy(updatedEnemy); // Update enemy state

    if (playerWon) {
      toast(
        `Congrats! You have defeated an enemy with ${
          player.weapon?.name || "your bare hands"
        }.`
      );
      inventory.map(item => {
        if (item?.type === "Gun") {
          const newAmmo = randomNumber(20);
          toast(`You looted ${newAmmo} ${item.name} Ammo from the enemy!`);
          item.ammunition += newAmmo;
        }
      });

      setEnemy(new Character({meleeDamage: player.xp / 100}));
    }
  };

  return (
    <>
      <GlobalStyles />

      <div>
        <HUD player={player} />
        <main>
          {player.health === 0 ? (
            <h1>You died. refresh the page to restart</h1>
          ) : (
            <>
              <h1>WW2 Text Adventure Game</h1>
              <Button onClick={() => setShowInventory(!showInventory)}>
                Toggle inventory
              </Button>
              {showInventory && <Inventory />}
              <p>Enemy: {enemy.health} HP</p>
              <Button onClick={handleBattle}>Fight</Button>
            </>
          )}
        </main>
      </div>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
