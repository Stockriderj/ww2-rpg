import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {Player, spawnRandomCharacter} from "../game-scripts/characters";
import {
  BoltAction,
  Pistol,
  Grenade,
  Medkit,
} from "../game-scripts/items/inventoryItems";
import {checkProbability, randomNumber, stackItems} from "../utils/helpers";
import toast from "react-hot-toast";

const PlayerContext = createContext();

const exploreDrops = [
  {
    chance: 20,
    items: ["Medkit", "Grenade"],
  },
];

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
  exploreTimer: -1, // if === 0, finish exploration code runs. we dont want that to run all the time
  exploreToast: null,
  enemy: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "startExplore":
      return {
        ...state,
        exploreTimer: action.payload,
      };
    case "setExploreToast":
      return {...state, exploreToast: action.payload};
    case "setEnemy":
      return {...state, enemy: action.payload};
    case "update":
      state.player.checkInventory();
      return {...state};
    case "tick":
      const exploreTimer = Math.max(-1, state.exploreTimer - 1);
      return {
        ...state,
        exploreTimer,
      };
  }
}

function PlayerProvider({children}) {
  const [{player, exploreTimer, exploreToast, enemy}, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(() => {
    if (exploreTimer === 0) finishExplore();
    if (exploreTimer === 5)
      dispatch({
        type: "setExploreToast",
        payload: toast.loading("Exploring... (5sec)"),
      });
    if (exploreTimer > 0 && exploreTimer < 5)
      dispatch({
        type: "setExploreToast",
        payload: toast.loading(`Exploring... (${exploreTimer}sec)`, {
          id: exploreToast,
        }),
      });
  }, [exploreTimer]);

  function finishExplore() {
    const numItemsToSpawn = randomNumber(0, 5);
    const droppedItems = [];

    for (let i = 0; i < numItemsToSpawn; i++) {
      const drop = exploreDrops.find(drop => checkProbability(drop.chance));
      if (drop) {
        const randomItem = drop.items[randomNumber(0, drop.items.length - 1)];
        droppedItems.push(randomItem);
      }
    }

    const {stackedItems, stackedText} = stackItems(droppedItems);

    stackedItems.forEach(item => player.addItem(item.name, item.quantity));
    player.addXp(droppedItems.length * 10);

    stackedItems.length
      ? toast.success(`You found ${stackedText}!`, {id: exploreToast})
      : toast.error("You didn't find anything.", {id: exploreToast});

    // enemy stuff
    let enemyFound = checkProbability(50) ? true : false;
    if (enemyFound) {
      dispatch({type: "setEnemy", payload: spawnRandomCharacter()});
      toast("You encountered an enemy!");
      new Audio("sounds/bad-to-the-bone.mp3").play();
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        player,
        exploreTimer,
        enemy,
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
