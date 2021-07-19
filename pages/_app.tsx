/**
 * next
 */
import type { AppProps } from 'next/app';

/**
 * recoil
 */
import { RecoilRoot } from 'recoil';

/**
 *  meterial ui
 */
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { GlobalTheme } from 'styles/GlobalTheme';

import 'styles/globals.css';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CssBaseline />
      <ThemeProvider theme={GlobalTheme}>
        <ApoLayout>
          <Component {...pageProps} />
        </ApoLayout>
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default MyApp;
