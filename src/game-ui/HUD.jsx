import {memo, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {GrAddCircle} from "react-icons/gr";
import {GiPerpendicularRings} from "react-icons/gi";

const HudContainer = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 3fr;

  background-color: rgba(26, 26, 26, 0.6);
  /* background: center
    url("https://driverguides.berlin/wp-content/uploads/2019/10/ED1FCEEF-024A-463F-82AE-18F376E3DDA5.jpeg")
    no-repeat; */
  background-size: cover;
  color: #d3cbbf;
  padding: 2rem 7.2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px); // Little blur effect for that frosted glass vibe
`;

const LevelIndicator = styled.div`
  position: relative;

  width: 69px;
  height: 100%;
  background: url("level-badge.png") no-repeat center;
  background-size: 69px;
  color: #fff8ee;
  text-align: center;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 4.8rem;
`;

const Stat = styled.p`
  margin: 0;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;

  /* Align icons to center, also add some gap so its not dogsht */
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & span {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  font-size: ${props => `${props.fontSize * 2.4 || 2.4}rem`};
`;

const PopupContainer = styled.div`
  position: absolute;
  left: ${props => props.position.left}px;
  top: ${props => props.position.top}px;
  font-size: 3.6rem;
  color: green;
  font-family: "Special Elite", cursive;
  font-weight: bolder;
  animation: ${props => props.animation} 1s ease-in-out forwards;
`;

export default function HUD({player}) {
  const [popups, setPopups] = useState([]);
  const xpDisplayRef = useRef(null);
  const lvlDisplayRef = useRef(null);

  const addPopup = (content, ref, animation) => {
    if (ref.current) {
      // create a new popup reference
      const rect = ref.current.getBoundingClientRect();
      const newPopup = {
        id: Math.random(),
        content,
        position: {left: rect.left, top: rect.bottom},
        animation,
      };

      // add the popup to the state - after 1 second, the popup expires and is removed
      setPopups(current => [...current, newPopup]);
      setTimeout(() => {
        setPopups(current => current.filter(popup => popup.id !== newPopup.id));
      }, 1000);
    }
  };

  // add a popup when player xp changes
  useEffect(() => {
    if (player.xp) addPopup(`+${player.addedXp}`, xpDisplayRef, "jumpIn");
  }, [player.xp]);

  // add a popup when player level changes
  useEffect(() => {
    if (player.level > 1) addPopup(`Level up!`, lvlDisplayRef, "fadeOutDrop");
  }, [player.level]);

  return (
    <HudContainer>
      <LevelIndicator ref={lvlDisplayRef}>{player.level}</LevelIndicator>
      <Stat ref={xpDisplayRef}>
        <span>
          <GiPerpendicularRings /> {player.xp} / {player.maxXp}
        </span>
        <progress
          value={player.xp - player.lastMaxXp}
          max={player.maxXp - player.lastMaxXp}
        />
      </Stat>
      <Stat>
        <span>
          <GrAddCircle /> {player.health} / {player.maxHealth}
        </span>
        <progress value={player.health} max={player.maxHealth} color="red" />
      </Stat>

      {popups.map(popup => (
        <PopupContainer
          key={popup.id}
          position={popup.position}
          animation={popup.animation}
        >
          {popup.content}
        </PopupContainer>
      ))}
    </HudContainer>
  );
}
