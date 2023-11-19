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
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
  }

  h1 {
    font-family: 'Special Elite', cursive;
    font-size: 3.6rem; // Make it big
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // A little shadow for depth
    margin-top: 8rem; // Push it down a bit from the top
    text-align: center; // Center that bad boy
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

export default GlobalStyles;
