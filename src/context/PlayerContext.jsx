import {createContext, useContext, useState} from "react";
import {BoltAction, Pistol} from "../game-scripts/inventoryItems";
import {Player} from "../game-scripts/characters";

const PlayerContext = createContext();

function PlayerProvider({children}) {
  const [items, setItems] = useState([
    new BoltAction({quantity: 1}),
    new Pistol({quantity: 3}),
    {name: "Medkit", quantity: 1},
    {name: "Secret Documents", quantity: 29109310},
  ]);
  const [player, setPlayer] = useState(
    new Player({meleeDamage: 10, weapon: items[0]})
  );

  return (
    <PlayerContext.Provider value={{items, setItems, player, setPlayer}}>
      {children}
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined)
    throw new Error("the context is in the wrong place. what r u doing???????");
  return context;
}

export {PlayerProvider, PlayerContext, usePlayer};
