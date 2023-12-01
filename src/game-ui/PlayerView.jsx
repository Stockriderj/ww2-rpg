import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";

import Tooltip from "./Tooltip";
import SidePanel from "./SidePanel";
import {getIcon} from "./Inventory";

const StyledPlayerView = styled.div`
  position: relative;
  background: url("https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png")
    center no-repeat;
  background-size: 30rem;
  width: 30rem;
  height: 50rem;

  display: flex;
  justify-content: space-around;
`;

const SlotCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const PlayerSlot = styled.div`
  position: relative;
  cursor: help;
  font-size: 6.4rem;
  color: var(--light-theme);
  height: 8.6rem;
  width: 8.6rem;
  padding: 1.2rem;
  border-radius: 1rem;
  background-color: var(--medium-theme);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
`;

export default function PlayerView() {
  const {player} = usePlayer();

  return (
    <SidePanel name="player">
      <StyledPlayerView>
        <SlotCol>
          {["primaryWeapon", "secondaryWeapon"].map(slot => (
            <PlayerSlot className={slot} key={slot}>
              {getIcon(player[slot])}
              <Tooltip parent={slot}>
                {player[slot]?.name || "No weapon"}
              </Tooltip>
            </PlayerSlot>
          ))}
        </SlotCol>
        <SlotCol />
        <SlotCol />
      </StyledPlayerView>
    </SidePanel>
  );
}
