// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bodyBackground: string;
    headerBackground: string;
    cardBackground: string;
    title: string;
    textColor: string;
    contentFont: string;
    contentLetterSpacing: string;
    contentFontSize: string;
    titleFont: string;
    titleLetterSpacing: string;
    titleFontSize: string;
    textAreaFont: string;
    textAreaFontWeight: number;
    textAreaLineHeight: number;
    textAreaFontSize: string;
    textAreaFontColor: string;
    textAreaBackground: string;
    clickableTextFont: string;
    clickableTextFontSize: string;
    clickableTextFontColor: string;
    artworkDisplayBackground: string;
    selectArtworkChoicesBackground: string;
    fadedContentColor: string;
    textReadableLuminosity: number;
    buttonBorderRadius: string;
    primaryButtonColor: string;
    secondaryButtonColor: string;
    smallButtonFont: string;
  }
}
