import React, {useEffect, useState} from "react";
import GlobalStyles from "./styles/GlobalStyles";

// Components
import HUD from "./game-ui/HUD";
import Inventory from "./game-ui/Inventory";

// Game scripts
import {BoltAction} from "./game-scripts/inventoryItems";
import {Enemy, battleRound} from "./game-scripts/battle";
import {Player} from "./game-scripts/characters";

function App() {
  const [items, setItems] = useState([
    new BoltAction(1),
    {name: "Medkit", quantity: 1},
    {name: "Secret Documents", quantity: 29109310},
  ]);
  const [player, setPlayer] = useState(new Player(items[0]));
  const [enemy, setEnemy] = useState(new Enemy(1000, 10)); // Example enemy

  const handleShoot = () => {
    const {updatedPlayer, updatedEnemy} = battleRound(player, enemy, "shoot");

    setItems([...items]); // Update state to reflect ammo change
    setPlayer(updatedPlayer);
    setEnemy(updatedEnemy); // Update enemy state
  };

  console.log(player);
  console.log(enemy);

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
