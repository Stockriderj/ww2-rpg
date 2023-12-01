import styled from "styled-components";
import {useActions} from "../context/ActionsContext";

import Button from "./Button";

const Close = styled(Button)`
  position: absolute;
  margin: 0;
  font-size: 1.2rem;
  background: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
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

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Heading = styled.h2`
  color: #333;
  text-align: center;
  font-size: 3.6rem;
  text-align: center;
  flex-grow: 1;
  margin: 0;
  text-transform: uppercase;
`;

export default function SidePanel({name, children}) {
  const {isVisible, setIsVisible} = useActions();

  return (
    <Container isvisible={(isVisible === name).toString()}>
      <Header>
        <Close size="small" onClick={() => setIsVisible("")}>
          X
        </Close>
        <Heading>{name}</Heading>
      </Header>
      {children}
    </Container>
  );
}
