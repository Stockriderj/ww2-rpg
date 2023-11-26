import styled from "styled-components";
import {useActions} from "../context/ActionsContext";

import Inventory from "./Inventory";
import {GiBackpack, GiTreasureMap} from "react-icons/gi";
import {ExploreButton} from "./ExploreButton";
import {usePlayer} from "../context/PlayerContext";
import toast from "react-hot-toast";

const Sidebar = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  transform: rotate(-90deg);
  transform-origin: left top;
  background: url("https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjB0ZXh0dXJlfGVufDB8fDB8fHww");
  background-size: cover;
  color: black;
  width: 100vh; // This becomes the height when rotated
  height: 50px; // This becomes the width

  display: flex;
  align-items: center;
`;

const Item = styled.button`
  display: block;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 4.2rem;
  padding: 0.4rem;
  transform: rotate(90deg);
  display: flex;
  align-items: center;

  &:hover {
    background-color: #ddd;
  }

  &:active {
    background-color: gray;
  }
`;

export default function Actions() {
  const {exploreTimer, enemy, dispatch} = usePlayer();
  const {isVisible, setIsVisible} = useActions();

  function handleExplore() {
    dispatch({type: "startExplore", payload: 5});
  }

  return (
    <>
      <Sidebar>
        <Item onClick={() => setIsVisible(!isVisible)}>
          <GiBackpack />
        </Item>
        <Item onClick={handleExplore} disabled={enemy || exploreTimer > 0}>
          <GiTreasureMap />
        </Item>
      </Sidebar>
      <Inventory />
    </>
  );
}
