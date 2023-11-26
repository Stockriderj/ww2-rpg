import {createContext, useContext, useReducer, useState} from "react";
import {Player} from "../game-scripts/characters";
import {
  BoltAction,
  Pistol,
  Grenade,
  Medkit,
} from "../game-scripts/items/inventoryItems";

const PlayerContext = createContext();

const initalState = {
  player: new Player({
    meleeDamage: 10,
    primaryWeapon: null,
    inventory: [
      new BoltAction({quantity: 1}),
      new Pistol({quantity: 1}),
      new Medkit({quantity: 5}),
      new Grenade({quantity: 3}),
      // {name: "Secret Documents", quantity: 29109310},
    ],
  }),
  scavengeTimer: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "startScavenge":
      return {...state, scavengeTimer: action.payload};
    case "update":
      state.player.checkInventory();
      return {...state};
    case "tick":
      return {
        ...state,
        scavengeTimer: Math.max(0, state.scavengeTimer - 1),
      };
  }
}

function PlayerProvider({children}) {
  const [{player, scavengeTimer}, dispatch] = useReducer(reducer, initalState);

  return (
    <PlayerContext.Provider
      value={{
        player,
        scavengeTimer,
        dispatch,
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
