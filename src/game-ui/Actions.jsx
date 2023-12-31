import styled from "styled-components";
import {useActions} from "../context/ActionsContext";

import Inventory from "./Inventory";
import {
  GiBackpack,
  GiBrodieHelmet,
  GiShop,
  GiTreasureMap,
} from "react-icons/gi";
import {usePlayer} from "../context/PlayerContext";
import Button from "./Button";
import Shop from "./Shop";
import PlayerView from "./PlayerView";

const Sidebar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background: url("https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjB0ZXh0dXJlfGVufDB8fDB8fHww");
  background-size: cover;
  color: black;
  width: 50px;
  height: 100%;
  box-shadow: 10px 0 5px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Item = styled(Button)`
  display: block;
  background: none;
  cursor: pointer;
  border-radius: 0;
  font-size: 42px;
  padding: 4px;
  display: flex;
  align-items: center;
`;

export default function Actions() {
  const {exploreTimer, enemy, dispatch} = usePlayer();
  const {isVisible, setIsVisible} = useActions();

  function handleExplore() {
    dispatch({type: "startExplore", payload: 5});
  }

  function handleVisible(el) {
    setIsVisible(isVisible === el ? "" : el);
  }

  return (
    <>
      <Sidebar>
        <Item onClick={() => handleVisible("player")}>
          <GiBrodieHelmet />
        </Item>
        <Item onClick={handleExplore} disabled={enemy || exploreTimer > 0}>
          <GiTreasureMap />
        </Item>
        <Item onClick={() => handleVisible("shop")} disabled={enemy}>
          <GiShop />
        </Item>
        <Item onClick={() => handleVisible("inventory")}>
          <GiBackpack />
        </Item>
      </Sidebar>
      <Inventory />
      <Shop />
      <PlayerView />
    </>
  );
}
