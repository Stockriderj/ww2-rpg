import styled, {css} from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    border-radius: 12px;
    padding: 0.8rem 1.2rem;
    margin: 0 0.6rem;
  `,
  medium: css`
    font-size: 1.8rem;
    border-radius: 10px;
    padding: 1.2rem 2.4rem;
  `,
};

const StyledButton = styled.button`
  font-family: Arial, Arial, Helvetica, sans-serif;
  font-weight: bolder;
  border: none;

  &:hover {
    background-color: #ddd;
  }

  &:active {
    background-color: gray;
  }

  ${props => sizes[props.size]}
`;

function Button({
  children,
  size = "medium",
  playSound = true,
  onClick = null,
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
