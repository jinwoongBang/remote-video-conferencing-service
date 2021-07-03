import { createMuiTheme } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

export const GlobalTheme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        // "@font-face": [
        //   {
        //     fontFamily: "Noto Sans KR",
        //     fontStyle: "normal",
        //     fontDisplay: "swap",
        //     fontWeight: 400,
        //     src: `
        //     local(''),
        //     local('Noto Sans KR'),
        //     url(${NotoSansWoff2}) format('woff2'),
        //     url(${NotoSansWoff}) format('woff')
        //   `,
        //   },
        // ],
        html: {
          WebkitFontSmoothing: 'auto',
          letterSpacing: -1,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      // lg: 1200,
      lg: 1080,
      xl: 1920,
    },
  },
});
