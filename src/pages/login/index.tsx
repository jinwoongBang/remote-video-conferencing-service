import React, { useCallback, useEffect, useState } from 'react';

/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';
import Router from 'next/router';

/**
 * recoil
 */
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
  selector,
  atom,
  useRecoilValue,
} from 'recoil';

/**
 * Material UI
 */
import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

/**
 * store
 */
import { authState, counterState } from 'src/store';
import UserVO, { User } from 'src//vo/UserVO';

/**
 * Hooks
 */
import useAuth from 'src/common/hooks/useAuth';

import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';
import { OTAError } from 'src/common/framework/Error';

interface ErrorProps {
  isError: boolean;
  message: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: '500px',
    height: '100vh',
    padding: 0,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '5px 0 10px rgba(0, 0, 0, 0.4)',
    [theme.breakpoints.down('md')]: {
      height: '200px',
      marginBottom: '100px',
    },
  },
  logo: {
    color: '#ffffff',
    fontWeight: 'bold',
    textShadow: 'pink 1px 0 10px',
  },
  loginTitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5em',
    // textShadow: 'pink 1px 0 10px',
  },
  loginFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    height: '40px',
  },
  divider: {},
}));

function Login({ userList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  const { auth } = useAuth({ redirectTo: '/', redirectIfFound: true });

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<ErrorProps>({
    isError: false,
    message: '',
  });

  const setAuth = useSetRecoilState(authState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);

    try {
      const { data, status } = await HttpClient.post(
        '/login',
        new UserVO({ userId: id, userPassword: password }),
      );
      const { success, result } = new OTAResponse<User>(data);
      setAuth((auth) => ({ user: result[0], isLoggedIn: true }));
    } catch (error) {
      setError({ isError: true, message: error.message });
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleChangeId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setId(value);
      setError({ isError: false, message: '' });
    },
    [],
  );
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setPassword(value);
      setError({ isError: false, message: '' });
    },
    [],
  );

  return (
    <main>
      <Container maxWidth={false} className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={12} lg={5} className={classes.logoContainer}>
            <Typography variant="h1" className={classes.logo}>
              On The Air
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={7}
            className={classes.loginFormContainer}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={3} className={classes.loginTitleContainer}>
                  <Typography
                    variant="caption"
                    color="primary"
                    className={classes.loginTitle}
                  >
                    On The Air
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="ID"
                    type="text"
                    value={id}
                    onChange={handleChangeId}
                    autoComplete="current-password"
                    variant="outlined"
                    error={error.isError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    onChange={handleChangePassword}
                    error={error.isError}
                    helperText={error.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider className={classes.divider} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.loginButton}
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size="1.8em" /> : 'Login'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ userList: UserVO[] }> = async ({
  params,
}) => {
  return {
    props: {
      userList: [],
    },
  };
};

export default Login;
