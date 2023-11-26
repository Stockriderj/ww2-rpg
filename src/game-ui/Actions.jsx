import styled from "styled-components";
import Inventory from "./Inventory";
import {useState} from "react";
import Button from "./Button";
import {useActions} from "../context/ActionsContext";

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
  justify-content: center;
`;

export default function Actions() {
  const {isVisible, setIsVisible} = useActions();

  return (
    <>
      <Sidebar>
        <Button onClick={() => setIsVisible(!isVisible)}>
          Toggle inventory
        </Button>
      </Sidebar>
      <Inventory />
    </>
  );
}
