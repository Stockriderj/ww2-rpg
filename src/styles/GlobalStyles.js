import {createGlobalStyle, keyframes} from "styled-components";

const GlobalStyles = createGlobalStyle`

    :root {
        --light-theme: #d3cbbf;
    }

  html {
    font-size: 62.5%; /* 1 rem = 10px */
    background-size: cover; // Cover the entire background
    background-attachment: fixed; // Keeps the background stationary during scroll
  }

  * {
    font-family: 'Special Elite', cursive;

    &::selection {
        background: none;
        text-shadow: none;
    }
  }

  body {
    cursor: default;
    width: 100vw;
    height: 100vh;
    font-size: 1.6rem; /* Base font size = 16px */
    overflow: hidden;
    margin: 0;
    margin-top: 14.4rem;
    padding: 0;
    /* background-color: #f4f4f4; */
    background: rgba(244, 244, 244, 1) url("https://www.theworldwar.org/sites/default/files/styles/hero/public/2022-01/trench-warfare-hero.jpg?itok=GPMwVCMU") center/cover no-repeat;
    color: var(--light-theme);
  }

  h1 {
    font-size: 4.8rem; // Make it big
    text-align: center;
  }

  h1, h2, .old-font {
    font-family: 'Special Elite', cursive;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // A little shadow for depth
  }

  /* Animations */
  @keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @keyframes fadeOut {
    from {opacity: 1;}
    to {opacity: 0;}
  }
`;

export const jumpIn = keyframes`
0% {
    opacity: 0;
}
50% {
    opacity: 1;
    margin-top: 25px;
    transform: scale(2);
}
100% {
    opacity: 0;
       margin-top: 0;
    transform: none;
}
`;

export const fadeOutDrop = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    margin-top: 25px;
  }
`;

export default GlobalStyles;
