import React, { Component, ErrorInfo, ReactNode, useEffect } from 'react';

/**
 * next
 */
import type { AppProps } from 'next/app';
import NextError from 'next/error';

/**
 * recoil
 */
import { RecoilRoot, useRecoilSnapshot } from 'recoil';

/**
 *  meterial ui
 */
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { GlobalTheme } from 'styles/GlobalTheme';

import 'styles/globals.css';

import RecoilDebugObserver from 'src/components/RecoilDebugObserver';
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <NextError statusCode={500} />;
    }

    return this.props.children;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <RecoilDebugObserver />
        <CssBaseline />
        <ThemeProvider theme={GlobalTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
export default MyApp;
