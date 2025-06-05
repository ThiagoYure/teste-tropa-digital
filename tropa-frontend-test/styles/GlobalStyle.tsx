"use client"
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; padding: 0; box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  body {
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    min-width: 100vw;
    min-height: 100vh;
  }

  :root {
    --main-orange: #CC6237;
    --light-orange: #FEA501;
    --black: #252525;
    --light-grey: #F5F5F5;
    --lighter-grey: #F6F6F6;
    --teal: #657593;
    --grey: #A3A3A3;
    --blue: #2A4D8E80;
  }

  ::placeholder {
    color: var(--teal);
    opacity: 1;
  }
`;

export default GlobalStyle;
