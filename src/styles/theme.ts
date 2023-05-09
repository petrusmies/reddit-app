import { createTheme } from "@mui/material";

interface ITheme {
  palette: {
    text: {
      primary: string;
      secondary: string;
    };
    background: {
      default: string;
      paper: string;
    };
  }
}

const theme: ITheme = {
  palette: {
    text: {
      primary: 'rgb(255, 255, 255)',
      secondary: 'rgb(200, 200, 200)',
    },
    background: {
      default: '#0b0f1a',
      paper: '#1c222a',
    },
  }
}

const customTheme = createTheme(theme);
export default customTheme;