import styled from "styled-components";

const HudContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #1a1a1a;
  color: #fff;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px); // Little blur effect for that frosted glass vibe
`;

const Stat = styled.p`
  margin: 0 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
`;

export default function HUD({player}) {
  return (
    <HudContainer>
      <Stat>Health: {player.health}</Stat>
      <Stat>Stamina: {player.stamina}</Stat>
      {/* Render more stats here */}
    </HudContainer>
  );
}
