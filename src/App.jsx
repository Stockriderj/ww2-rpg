import React, {useEffect, useState} from "react";
import GlobalStyles from "./styles/GlobalStyles";

// Components
import HUD from "./game-ui/HUD";
import Inventory from "./game-ui/Inventory";

// Game scripts
import {BoltAction, Pistol} from "./game-scripts/inventoryItems";
import {battleRound} from "./game-scripts/battle";
import {Character, Player} from "./game-scripts/characters";

function App() {
  const [items, setItems] = useState([
    new BoltAction(1),
    {name: "Medkit", quantity: 1},
    {name: "Secret Documents", quantity: 29109310},
  ]);
  const [player, setPlayer] = useState(new Character(10, items[0]));
  const [enemy, setEnemy] = useState(new Character(50, new Pistol(1))); // Example enemy

  const handleShoot = () => {
    const {updatedPlayer, updatedEnemy} = battleRound(player, enemy, "shoot");

    setItems([...items]); // Update state to reflect ammo change
    setPlayer(updatedPlayer);
    setEnemy(updatedEnemy); // Update enemy state
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
              <Inventory items={items} setItems={setItems} />
              <p>
                Enemy: {enemy.health} | U: {player.health}
              </p>
              <button onClick={handleShoot}>doiyoiyoiyoing</button>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
