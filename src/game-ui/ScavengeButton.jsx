import {useEffect, useRef} from "react";
import toast from "react-hot-toast";
import {usePlayer} from "../context/PlayerContext";
import {randomNumber, stackItems} from "../utils/helpers";

import Button from "./Button";

const scavengeDrops = [
  {
    chance: 20,
    items: ["Medkit", "Grenade"],
  },
];

// implement flavor texts later (when i feel like it)

export function ScavengeButton() {
  const {player, scavengeTimer, dispatch} = usePlayer();
  const isScavenging = useRef(false);
  const loadingToast = useRef(null);

  useEffect(() => {
    if (scavengeTimer === 0 && isScavenging.current) {
      isScavenging.current = false;

      let droppedItems = [];

      for (let i = 0; i < randomNumber(2, 5); i++) {
        droppedItems = [
          ...droppedItems,
          ...scavengeDrops.flatMap(drop =>
            randomNumber(0, 100) <= drop.chance
              ? drop.items[randomNumber(0, drop.items.length - 1)]
              : []
          ),
        ];
      }

      const {stackedItems, stackedText} = stackItems(droppedItems);

      stackedItems.forEach(item => player.addItem(item.name, item.quantity));
      player.addXp(droppedItems.length * 10);
      dispatch({type: "update"});

      stackedItems.length
        ? toast.success(`You found ${stackedText}!`, {id: loadingToast.current})
        : toast.error("You didn't find anything.", {id: loadingToast.current});
    }
  }, [scavengeTimer]);

  function startScavenge() {
    dispatch({type: "startScavenge", payload: 5});
    loadingToast.current = toast.loading("Scavenging...");
    isScavenging.current = true;
  }

  return (
    <Button onClick={startScavenge} disabled={isScavenging.current}>
      {isScavenging.current
        ? `Scavenging... ${scavengeTimer}sec`
        : "Scavenge! (5sec)"}
    </Button>
  );
}
