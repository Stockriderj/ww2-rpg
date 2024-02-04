import styled from "styled-components";

import {usePlayer} from "../context/PlayerContext";

const StyledBattle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 6.4rem;
`;

const Character = styled.div`
  background: url("https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png")
    center;
  background-size: 20rem;
  width: 20rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h2 {
    text-align: center;
    font-weight: 700;
    font-size: 4.8rem;
    margin-top: -4.8rem;
  }
`;

export default function Battle() {
  const {enemy} = usePlayer();

  return (
    <StyledBattle>
      <Character>
        <h2>you</h2>
      </Character>

      <Character>
        <h2>{enemy.health} HP</h2>
        {enemy && <p>Weapon: {enemy.primaryWeapon?.name || "Bare hands"}</p>}
      </Character>
    </StyledBattle>
  );
}
