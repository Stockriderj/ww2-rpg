import styled from "styled-components";
import {usePlayer} from "../context/PlayerContext";
import {useActions} from "../context/ActionsContext";

import {
  GiFirstAidKit,
  GiGrenade,
  GiLeeEnfield,
  GiStickFrame,
  GiWaltherPpk,
} from "react-icons/gi";
import Button from "./Button";
import InventoryItem from "./InventoryItem";
import Tooltip from "./Tooltip";

const Close = styled(Button)`
  position: absolute;
  margin: 0;
  font-size: 1.2rem;
  background: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InventoryContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  overflow: scroll;
  height: 100vh;
  width: fit-content;
  background: rgba(0, 0, 0, 0.9)
    url("https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjB0ZXh0dXJlfGVufDB8fDB8fHww");
  background-size: cover;
  box-shadow: -10px 0 5px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  z-index: 999;

  transform: ${props =>
    props.isvisible === "true" ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.5s ease-in-out; // Smooth transition for sliding in and out
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InventoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InventoryHeading = styled.h2`
  color: #333;
  text-align: center;
  font-size: 3.6rem;
  text-align: center;
  flex-grow: 1;
  margin: 0;
  text-transform: uppercase;
`;

const PlayerView = styled.div`
  position: relative;
  background: url("https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png")
    center no-repeat;
  background-size: 30rem;
  width: 100%;
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

export function getIcon(item) {
  switch (item?.type) {
    case "Gun":
      switch (item.subType) {
        case "Bolt Action":
          return <GiLeeEnfield />;
        case "Pistol":
          return <GiWaltherPpk />;
      }
    case "Medkit":
      return <GiFirstAidKit />;
    case "Grenade":
      return <GiGrenade />;
    default:
      return <GiStickFrame />;
  }
}

export default function Inventory() {
  const {player} = usePlayer();
  const {isVisible, setIsVisible} = useActions();

  return (
    <InventoryContainer isvisible={isVisible.toString()}>
      <InventoryHeader>
        <Close size="small" onClick={() => setIsVisible(false)}>
          X
        </Close>
        <InventoryHeading>Inventory</InventoryHeading>
      </InventoryHeader>
      <ItemList>
        {player.inventory.map(item => (
          <InventoryItem item={item} key={item.name} />
        ))}
      </ItemList>

      <PlayerView>
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
      </PlayerView>
    </InventoryContainer>
  );
}
