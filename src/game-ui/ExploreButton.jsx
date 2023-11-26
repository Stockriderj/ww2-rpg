import {useEffect, useRef} from "react";
import toast from "react-hot-toast";
import {usePlayer} from "../context/PlayerContext";
import {checkProbability, randomNumber, stackItems} from "../utils/helpers";

import Button from "./Button";
import {spawnRandomCharacter} from "../game-scripts/characters";

import {GiTreasureMap} from "react-icons/gi";

// implement flavor texts later (when i feel like it)

export function ExploreButton({enemy, setEnemy}) {
  const {player, exploreTimer, dispatch} = usePlayer();
  const isScavenging = useRef(false);

  useEffect(() => {}, [exploreTimer]);

  function startExplore() {
    dispatch({type: "startExplore", payload: 5});
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
