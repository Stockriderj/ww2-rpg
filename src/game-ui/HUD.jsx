import {memo, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {GrAddCircle} from "react-icons/gr";
import {GiPerpendicularRings} from "react-icons/gi";
import {usePlayer} from "../context/PlayerContext";
import ProgressBar from "./ProgressBar";

const HudContainer = styled.header`
  position: relative;
  display: flex;
  justify-content: flex-start;
  justify-items: flex-start;
  gap: 2.4rem;

  background-color: rgba(26, 26, 26, 0.6);
  background-size: cover;
  color: #d3cbbf;
  padding: 2rem 7.2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px); // Little blur effect for that frosted glass vibe
  font-size: 2.4rem;

  @media (max-width: 600px) {
    padding: 1rem 1.2rem;
    font-size: 1.2rem;
    gap: 1.2rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const LevelIndicator = styled.div`
  position: relative;

  width: 69px;
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

  @media (max-width: 600px) {
    font-size: 2.4rem;
    width: 42px;
    background-size: 42px;
  }
`;

const Stat = styled.div`
  margin: 0;
  padding: 0 1.2rem;
  width: 32rem;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;

  /* Align icons to center, also add some gap so its not dogsht */
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-start;
  justify-content: center;

  & span {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  @media (max-width: 600px) {
    width: 7.2rem;
  }
`;

const PopupContainer = styled.div`
  position: absolute;
  left: ${props => props.position.left}px;
  top: ${props => props.position.top}px;
  font-size: 3.6rem;
  color: ${props => props.color};
  font-family: "Special Elite", cursive;
  font-weight: bolder;
  animation: ${props => props.animation} 1s ease-in-out forwards;
`;

export default function HUD() {
  const {player} = usePlayer();
  const [popups, setPopups] = useState([]);
  const xpDisplayRef = useRef(null);
  const lvlDisplayRef = useRef(null);
  const healthDisplayRef = useRef(null);
  const oldHealth = useRef(100);

  const addPopup = (content, ref, color, animation) => {
    if (ref.current) {
      // create a new popup reference
      const rect = ref.current.getBoundingClientRect();
      const newPopup = {
        id: Math.random(),
        content,
        position: {left: rect.left, top: rect.bottom},
        color,
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
    if (player.xp)
      addPopup(`+${player.addedXp}`, xpDisplayRef, "green", "jumpIn");
  }, [player.xp]);

  // add a popup when player level changes
  useEffect(() => {
    if (player.level > 1)
      addPopup(`Level up!`, lvlDisplayRef, "green", "fadeOutDrop");
  }, [player.level]);

  // add a popup when health changes
  useEffect(() => {
    if (oldHealth.current !== player.health)
      addPopup(
        `${oldHealth.current > player.health ? "-" : "+"}${Math.abs(
          player.health - oldHealth.current
        )}`,
        healthDisplayRef,
        "red",
        "fadeOutDrop"
      );
    oldHealth.current = player.health;
  }, [player.health]);

  return (
    <HudContainer>
      <LevelIndicator ref={lvlDisplayRef}>{player.level}</LevelIndicator>
      <Row>
        <Stat ref={xpDisplayRef}>
          <span>
            <GiPerpendicularRings /> {player.xp} / {player.maxXp}
          </span>
          <ProgressBar
            background="#0F2443"
            fill="#174383"
            value={player.xp - (player.level > 1 ? player.lastMaxXp : 0)}
            max={player.maxXp - (player.level > 1 ? player.lastMaxXp : 0)}
          />
        </Stat>
        <Stat ref={healthDisplayRef}>
          <span>
            <GrAddCircle /> {player.health} / {player.maxHealth}
          </span>
          <ProgressBar
            background="#280303"
            fill="#560A0A"
            value={player.health}
            max={player.maxHealth}
          />
        </Stat>
      </Row>

      {popups.map(({id, content, ...rest}) => (
        <PopupContainer key={id} {...rest}>
          {content}
        </PopupContainer>
      ))}
    </HudContainer>
  );
}
