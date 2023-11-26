import {useEffect, useRef} from "react";
import toast from "react-hot-toast";
import {usePlayer} from "../context/PlayerContext";
import {checkProbability, randomNumber, stackItems} from "../utils/helpers";

import Button from "./Button";
import {spawnRandomCharacter} from "../game-scripts/characters";

import {GiTreasureMap} from "react-icons/gi";

const exploreDrops = [
  {
    chance: 20,
    items: ["Medkit", "Grenade"],
  },
];

// implement flavor texts later (when i feel like it)

export function ExploreButton({enemy, setEnemy}) {
  const {player, exploreTimer, dispatch} = usePlayer();
  const isScavenging = useRef(false);
  const loadingToast = useRef(null);

  useEffect(() => {
    if (exploreTimer === 0 && isScavenging.current) {
      isScavenging.current = false;

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
        ? toast.success(`You found ${stackedText}!`, {id: loadingToast.current})
        : toast.error("You didn't find anything.", {id: loadingToast.current});

      // enemy stuff
      let enemyFound = checkProbability(50) ? true : false;
      if (enemyFound) {
        setEnemy(spawnRandomCharacter());
        toast("You encountered an enemy!");
        new Audio("sounds/bad-to-the-bone.mp3").play();
      }

      dispatch({type: "update"});
    }
  }, [exploreTimer]);

  function startExplore() {
    dispatch({type: "startExplore", payload: 5});
    loadingToast.current = toast.loading("Exploring...");
    isScavenging.current = true;
  }

  return (
    <Button onClick={startExplore} disabled={isScavenging.current || enemy}>
      <GiTreasureMap />
      {isScavenging.current
        ? `Exploring... ${exploreTimer}sec`
        : "Explore! (5sec)"}
    </Button>
  );
}
