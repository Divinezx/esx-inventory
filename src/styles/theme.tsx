import { createMuiTheme  } from "@material-ui/core";

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: false; // remove o ponto de quebra `xs`
    sm: false;
    md: false;
    lg: false;
    xl: false;
    '720p': true;
    '1080p': true;
    '1440p': true;
    '2160p': true; // adiciona o ponto de quebra `tablet`
    laptop: false;
    desktop: false;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    inventory: {
      backgroundColor: React.CSSProperties['color'],
      secondaryBackgroundColor: React.CSSProperties['color'],
      textColor: React.CSSProperties['color'],
      secondaryTextColor: React.CSSProperties['color'],
      buttonColor: React.CSSProperties['color'],
      borderColor: React.CSSProperties['color'],
      hoverColor: React.CSSProperties['color']
    }
  }

 interface ThemeOptions {
    inventory?: {
      backgroundColor: React.CSSProperties['color'],
      secondaryBackgroundColor: React.CSSProperties['color'],
      textColor: React.CSSProperties['color'],
      secondaryTextColor: React.CSSProperties['color'],
      buttonColor: React.CSSProperties['color'],
      borderColor: React.CSSProperties['color'],
      hoverColor: React.CSSProperties['color']
    }
  }
}

export const InventoryTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "rgba(0,0,0,0.9)",
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.6)",
    },
    text: {
      secondary: "rgba(0, 255, 255, 0.9)",
      primary: "rgba(255, 255, 255, 0.8)",
    },

  },
  inventory: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    secondaryBackgroundColor: "rgba(5, 5, 5, 0.85)",
    textColor: "rgba(255, 255, 255, 0.8)",
    secondaryTextColor: "rgba(0, 255, 255, 0.9)",
    buttonColor: "rgba(100, 100, 100, 0.9)",
    borderColor: "rgba(255, 255, 255, 0.6)",
    hoverColor: "rgba(50, 50, 50, 0.5)"
  },
  breakpoints: {
    values: {
      '720p': 1280,
      '1080p': 1920,
      '1440p': 2560,
      '2160p': 3840
    },
  }
});
