import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  }

  /* html,
  body {
    height: 100%;
  } */

  body {
    box-sizing: border-box;
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Helvetica, Arial, sans-serif; */
      font-family: 'Quicksand', sans-serif;
    /* color: #172b4d;   */
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    /* line-height: 1.42857142857143; */
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
  }

  input {
    /* border: none; */
    outline: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
  }

  /* #root {
    height: 100%;
    width: 100%;
  } */

  a {
    /* color: currentColor; */
    /* color: #0052cc; */
    text-decoration: none;
  }
  
  a:hover {
    /* color: #0065ff; */
    text-decoration: underline;
}
`;
