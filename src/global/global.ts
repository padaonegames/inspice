import { createGlobalStyle } from 'styled-components';

const global = {
  colour: {
    smokeWhite: '#F3F3F3',
  },

  fonts: {
    body: {
      family: "Raleway;",
    },
    title: {
      family: "Raleway;",
      normal: 400,
      bold: 700,
      black: 900,
    },
  },
};


// TODO: ahora mismo casi todo está heredado de Gift, personalizar
const GlobalStyles = createGlobalStyle`

  /* Fonts */

  /* Reset */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    line-height: 1;
    box-sizing: border-box;
  }
  input[type="button" i], input[type="submit" i], input[type="reset" i],
  input[type="file" i]::-webkit-file-upload-button, button {
    background-color: transparent;
  }

  /* Global styles */
  html {
    background-color: #f9f9f9;
    margin: 0 auto;
    /* Limit the maximum width of all screens */
    /* Desktop */
  }

  body {
    font-family: Raleway;
    background-color: #f9f9f9;
    color: black;
    -webkit-font-smoothing: antialiased;
    margin: 0 auto;
  }

  body > #root > div {
    height: 100%;
  }

  /* Reset anchors to allow components to style */
  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2 {
   font-family: ${global.fonts.title.family};
   font-weight: ${global.fonts.title.bold};
   margin-bottom: 1em;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h5 {
    font-weight: 700;
    margin-bottom: 0.7vh;
  }

  p {
    margin-bottom: 1em;
  }

  button {
    padding: 0;
    border: none;
    cursor: pointer;
  }
`;

export {
  GlobalStyles,
  global,
};
