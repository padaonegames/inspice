import { useContext } from "react";
import { AvailableThemes, ThemeContext } from "./ThemeStore";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const themes: AvailableThemes = {
  dark: {
    bodyBackground: 'darkgray',
    headerBackground: '#212529',
    title: "#6495ed",
    textColor: 'white',
    contentFont: 'Raleway',
    contentFontSize: '1em',
    contentLetterSpacing: '+0',
    titleFont: 'Anonymous Pro',
    titleFontSize: '1.2em',
    titleLetterSpacing: '+2px',
    cardBackground: '#4b4b4b',
    textAreaFontSize: '0.9em',
    textAreaFontWeight: 400,
    textAreaLineHeight: 1.5,
    textAreaBackground: 'white',
    textAreaFont: 'Raleway',
    textAreaFontColor: 'black',
    clickableTextFont: 'Raleway',
    clickableTextFontSize: '1em',
    clickableTextFontColor: '#FFFF00',
    artworkDisplayBackground: 'black',
  },
  light: {
    bodyBackground: '#F3F3F3',
    headerBackground: "#fff",
    title: "#ff6347",
    textColor: "#000",
    contentFont: 'Raleway',
    contentFontSize: '1em',
    contentLetterSpacing: '+0',
    titleFont: 'Anonymous Pro',
    titleFontSize: '1.2em',
    titleLetterSpacing: '+2px',
    cardBackground: 'white',
    textAreaFontSize: '0.9em',
    textAreaFontWeight: 400,
    textAreaLineHeight: 1.5,
    textAreaBackground: '#F3F3F3',
    textAreaFont: 'Raleway',
    textAreaFontColor: 'black',
    clickableTextFont: 'Raleway',
    clickableTextFontSize: '1em',
    clickableTextFontColor: 'brown',
    artworkDisplayBackground: '#474747',
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    line-height: 1;
    box-sizing: border-box;
    transition: all 0.5s;
    font-family: ${props => props.theme.contentFont};
    font-size: ${props => props.theme.contentFontSize};
    color: ${props => props.theme.textColor};
    letter-spacing: ${props => props.theme.contentLetterSpacing};
  }
  body {
    background-color: ${props => props.theme.bodyBackground};
  }
  textarea {
    font-family: ${props => props.theme.textAreaFont};
    font-size: ${props => props.theme.textAreaFontSize};
    color: ${props => props.theme.textAreaFontColor};
    line-height: ${props => props.theme.textAreaLineHeight};
    font-weight: ${props => props.theme.textAreaFontWeight};
    background-color: ${props => props.theme.textAreaBackground};
    border: 1px solid ${props => props.theme.textAreaFontColor};
    padding: 10px;
  }
`;

//  color: #3f3c2d;

/**
 * This component uses a parent ThemeContext provider that includes
 * information relative to the theme currently being used by the application
 * and then exposes styled-component's native ThemeProvider to be able to 
 * access themes directly from styled-components without having to make explicit
 * use of the useContext hook (instead, from a styled component, use props.theme)
 */
const Theme: React.FC = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;