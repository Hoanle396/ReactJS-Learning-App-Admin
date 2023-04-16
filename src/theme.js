import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8624DB',
    },
    secondary: {
      main: '#4E4D4F',
    },
    error: {
      main: "#DB190C",
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  },
  shape: {
    borderRadius: 10
  }
})