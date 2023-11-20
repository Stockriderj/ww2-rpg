import styled from "styled-components";

import {GrAddCircle} from "react-icons/gr";
import {GiPerpendicularRings} from "react-icons/gi";
import {useEffect, useRef, useState} from "react";
import {fadeOutDrop, jumpIn} from "../styles/GlobalStyles";

const HudContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 5fr;

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
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px); // Little blur effect for that frosted glass vibe
`;

const Col = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const Stat = styled.p`
  margin: 0 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;

  /* Align icons to center, also add some gap so its not dogsht */
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: ${props => `${props.fontSize * 2.4 || 2.4}rem`};
`;

export default function HUD({player}) {
  const isInitialRender = useRef(true);

  const [oldLvl, setOldLvl] = useState(player.level);

  const [popupPositions, setPopupPositions] = useState({
    xp: {left: 0, top: 0},
    lvl: {left: 0, top: 0},
  });
  const xpDisplayRef = useRef(null); // Create a ref
  const lvlDisplayRef = useRef(null); // Create a ref

  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const xpRect = xpDisplayRef.current.getBoundingClientRect();
    const lvlRect = lvlDisplayRef.current.getBoundingClientRect();

    //   get coords of xp display so the popup goes to the right spot
    setPopupPositions({
      xp: {
        left: xpRect.left,
        top: xpRect.bottom,
      },
      lvl: {
        left: lvlRect.left,
        top: lvlRect.bottom,
      },
    });
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      ["xp", "lvl"].map(dependency => {
        if (
          (dependency === "lvl" && oldLvl !== player.level) ||
          dependency === "xp"
        ) {
          setPopups(popups => [
            ...popups,
            <Popup
              key={popups.length}
              pos={popupPositions[dependency]}
              change={
                dependency === "xp" ? player.addedXp : player.level - oldLvl
              }
            />,
          ]); // Add a popup to the DOM
          setTimeout(() => {
            setPopups(popups => popups.slice(0, -1));
          }, 1500); // Remove the popup when it's done animating
          dependency === "lvl" && setOldLvl(player.level);
        }
      });
    }
  }, [player.xp, player.level]);

  return (
    <HudContainer>
      <Col>
        <Stat fontSize={1.6} ref={lvlDisplayRef}>
          {player.level}
        </Stat>
        <Stat ref={xpDisplayRef}>
          <GiPerpendicularRings /> {player.xp} / {player.maxXp}
        </Stat>
      </Col>

      <Stat>
        <GrAddCircle /> {player.health} / {player.maxHealth}
      </Stat>

      {popups}
    </HudContainer>
  );
}

// Styled component for the text
const StyledPopup = styled.div`
  position: absolute;
  left: ${props => props.pos.left}px;
  top: ${props => props.pos.top}px;
  font-size: 3.6rem;

  color: green; // Green text
  font-family: sans-serif;
  font-weight: bolder;
  animation: ${jumpIn} 1s ease-in-out forwards; // Animation lasting 1 second
`;
function Popup({change, pos}) {
  if (!pos) return null;
  return <StyledPopup pos={pos}>+{change}</StyledPopup>;
}
