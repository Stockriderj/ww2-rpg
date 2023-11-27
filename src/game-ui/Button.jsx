import styled, {css} from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    border-radius: 1.2rem;
    padding: 0.8rem 1.2rem;
    /* 
    @media (max-width: 600px) {
      font-size: 0.8rem;
      border-radius: 6px;
      padding: 0.4rem 0.6rem;
    } */
  `,
  medium: css`
    font-size: 1.8rem;
    border-radius: 1rem;
    padding: 1.2rem 2.4rem;
    /* 
    @media (max-width: 600px) {
      font-size: 1.2rem;
      border-radius: 5px;
      padding: 0.6rem 1.2rem;
    } */
  `,
};

const StyledButton = styled.button`
  font-family: Arial, Arial, Helvetica, sans-serif;
  font-weight: bolder;
  color: #000;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    opacity: 0.3;
  }

  &:active {
    background-color: gray;
  }

  ${props => sizes[props.size]}

  transition: opacity 0.3s;
`;

function Button({
  children,
  size = "medium",
  playSound = true,
  onClick = () => {},
  ...rest
}) {
  function handleClick() {
    if (playSound) new Audio("sounds/click.mp3").play();
    onClick();
  }

  return (
    <StyledButton size={size} onClick={handleClick} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
