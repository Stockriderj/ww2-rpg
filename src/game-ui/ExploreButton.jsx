import {useEffect, useRef} from "react";
import toast from "react-hot-toast";
import {usePlayer} from "../context/PlayerContext";
import {checkProbability, randomNumber, stackItems} from "../utils/helpers";

import Button from "./Button";
import {spawnRandomCharacter} from "../game-scripts/characters";

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

      let droppedItems = [];
      let enemyFound = checkProbability(100) ? true : false;

      for (let i = 0; i < randomNumber(2, 5); i++) {
        droppedItems = [
          ...droppedItems,
          ...exploreDrops.flatMap(drop =>
            checkProbability(drop.chance)
              ? drop.items[randomNumber(0, drop.items.length - 1)]
              : []
          ),
        ];
      }

      const {stackedItems, stackedText} = stackItems(droppedItems);

      stackedItems.forEach(item => player.addItem(item.name, item.quantity));
      player.addXp(droppedItems.length * 10);

      stackedItems.length
        ? toast.success(`You found ${stackedText}!`, {id: loadingToast.current})
        : toast.error("You didn't find anything.", {id: loadingToast.current});

      // enemy stuff
      if (enemyFound) {
        setEnemy(spawnRandomCharacter());
        toast("You encountered an enemy!");
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
      {isScavenging.current
        ? `Exploring... ${exploreTimer}sec`
        : "Explore! (5sec)"}
    </Button>
  );
}
