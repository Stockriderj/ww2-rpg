import {createContext, useContext, useReducer, useState} from "react";
import {BoltAction, Pistol} from "../game-scripts/items/guns";
import {Player} from "../game-scripts/characters";
import {Grenade, Medkit} from "../game-scripts/items/inventoryItems";

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
    case "update":
      return {...state, player: state.player};
    case "startScavenge":
      return {...state, scavengeTimer: action.payload};
    case "tick":
      console.log("balls (tick)");
      return {
        ...state,
        scavengeTimer:
          state.scavengeTimer === 0
            ? state.scavengeTimer
            : state.scavengeTimer - 1,
      };
  }
}

function PlayerProvider({children}) {
  const [{player, scavengeTimer}, dispatch] = useReducer(reducer, initalState);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // function updatePlayer() {
  //   dispatch({})
  //   forceUpdate();
  // }

  return (
    <PlayerContext.Provider
      value={{
        player,
        scavengeTimer,
        dispatch,
        // updatePlayer,
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
