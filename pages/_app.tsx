import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

/**
 *  meterial ui
 */
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { GlobalTheme } from 'styles/GlobalTheme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CssBaseline />
      <ThemeProvider theme={GlobalTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default MyApp;
