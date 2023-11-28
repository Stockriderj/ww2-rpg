// import {cloneElement, memo} from "react";
import styled from "styled-components";

const TooltipText = styled.p`
  visibility: hidden;
  font-family: Arial, Arial, Helvetica, sans-serif;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  width: fit-content;
  color: var(--light-theme);
  padding: 0.6rem;
  font-size: 1.2rem;
  border-radius: 6px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);

  position: absolute;
  left: 105%;
  top: 0;
  z-index: 1;

  ${props => `.${props.parent}`}:hover & {
    visibility: visible;
  }
`;

function Tooltip({parent, children}) {
  // console.log(parent);
  return <TooltipText parent={parent}>{children}</TooltipText>;
}

export default Tooltip;
