import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1.8rem;
  padding: 1.2rem 2.4rem;
  border-radius: 10px;
  border: none;

  &:hover {
    background-color: #ddd;
  }

  &:active {
    background-color: gray;
  }
`;

function Button({children, playSound = true, onClick = null, ...rest}) {
  function handleClick() {
    if (playSound) new Audio("sounds/click.mp3").play();
    onClick();
  }

  return (
    <StyledButton onClick={handleClick} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
