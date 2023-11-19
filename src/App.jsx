import React, {useEffect, useState} from "react";
import GlobalStyles from "./styles/GlobalStyles";

// Components
import HUD from "./game-ui/HUD";
import Inventory from "./game-ui/Inventory";

// Game scripts
import {Pistol} from "./game-scripts/items/guns.js";
import {battleRound} from "./game-scripts/battle";
import {Character, Player} from "./game-scripts/characters";
import {usePlayer} from "./context/PlayerContext";

function App() {
  const {inventory, setInventory, player, setPlayer, updatePlayer} =
    usePlayer();
  const [enemy, setEnemy] = useState(
    new Character({meleeDamage: 10}) // , weapon: new Pistol(1)
  ); // Example enemy

  const handleBattle = () => {
    const {updatedPlayer, updatedEnemy, playerWon} = battleRound(
      player,
      enemy,
      "shoot"
    );

    setInventory([...inventory]); // Update state to reflect ammo change
    updatePlayer();
    setEnemy(updatedEnemy); // Update enemy state

    if (playerWon) setEnemy(new Character({meleeDamage: player.xp / 100}));
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
              <Inventory />
              <p>Enemy: {enemy.health} HP</p>
              <button onClick={handleBattle}>Fight</button>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
