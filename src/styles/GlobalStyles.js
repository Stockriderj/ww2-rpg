import {createGlobalStyle, keyframes} from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%; /* 1 rem = 10px */
    background-size: cover; // Cover the entire background
    background-attachment: fixed; // Keeps the background stationary during scroll
  }

  * {
    font-family: 'Special Elite', cursive;
  }

  body {
    font-size: 1.6rem; /* Base font size = 16px */
    margin: 0;
    margin-top: 14.4rem;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
  }

  h1 {
    font-family: 'Special Elite', cursive;
    font-size: 4.8rem; // Make it big
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // A little shadow for depth
    text-align: center;
  }
  
  h1, h2 {
    color: #444;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
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
