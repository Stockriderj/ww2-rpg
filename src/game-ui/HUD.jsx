import styled from "styled-components";

import {GrAddCircle} from "react-icons/gr";
import {GiPerpendicularRings} from "react-icons/gi";
import {useEffect, useRef, useState} from "react";
// import {fadeOut} from "../styles/GlobalStyles";

const HudContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 5fr;

  background-color: #1a1a1a;
  color: #fff;
  padding: 2rem;
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
  //   const [xpChanged, setXpChanged] = useState(false);
  //   const [oldXp, setOldXp] = useState(0);

  //   const [xpPopupPosition, setXpPopupPosition] = useState({left: 0, top: 0});
  //   const xpDisplayRef = useRef(null); // Create a ref

  //   useEffect(() => {
  //     if (player.xp !== oldXp) {
  //       setXpChanged(true);

  //       //   get coords of xp display so the popup goes to the right spot
  //       if (xpDisplayRef.current) {
  //         const rect = xpDisplayRef.current.getBoundingClientRect();
  //         setXpPopupPosition({
  //           left: rect.left,
  //           top: rect.bottom,
  //         });
  //       }
  //     } else {
  //       setXpChanged(false);
  //     } // If xp changes then it'll show popup
  //   }, [player.xp, oldXp]);
  //   console.log(xpChanged);

  return (
    <HudContainer>
      <Col>
        <Stat>
          <GiPerpendicularRings /> {player.level}
        </Stat>
        {/*ref={xpDisplayRef} VVV */}
        <Stat>
          {player.xp} / {player.maxXp}
        </Stat>
      </Col>

      <Stat>
        <GrAddCircle /> {player.health} / {player.maxHealth}
      </Stat>

      {/* {xpChanged ? (
        <XpPopup
          pos={xpPopupPosition}
          xpChange={player.addedXp}
          onDone={() => {
            setOldXp(player.xp);
          }}
        />
      ) : (
        ""
      )} */}
    </HudContainer>
  );
}

// Styled component for the text
// const StyledXpPopup = styled.div`
//   position: absolute;
//   left: ${props => props.pos.left}px;
//   top: ${props => props.pos.top}px;
//   font-size: 3.6rem;

//   color: green; // Green text
//   font-weight: bold;
//   animation: ${fadeOut} 1s ease-out; // Animation lasting 1 second
// `;
// function XpPopup({xpChange, onDone, pos}) {
//   setTimeout(() => {
//     onDone();
//   }, 1000);

//   return <StyledXpPopup pos={pos}>+{xpChange}</StyledXpPopup>;
// }
