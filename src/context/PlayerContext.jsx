import {createContext, useContext, useReducer, useState} from "react";
import {BoltAction, Pistol} from "../game-scripts/items/guns";
import {Player} from "../game-scripts/characters";
import {Grenade, Medkit} from "../game-scripts/items/inventoryItems";

const PlayerContext = createContext();

function PlayerProvider({children}) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const [player, setPlayer] = useState(
    new Player({
      meleeDamage: 10,
      primaryWeapon: null,
      inventory: [
        new BoltAction({quantity: 1}),
        new Pistol({quantity: 1}),
        new Medkit({quantity: 5}),
        new Grenade({quantity: 82183829}),
        // {name: "Secret Documents", quantity: 29109310},
      ],
    })
  );

  function updatePlayer() {
    setPlayer(player);
    forceUpdate();
  }

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        updatePlayer,
      }}
    >
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
