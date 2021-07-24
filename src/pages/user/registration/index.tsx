import React, { useEffect } from 'react';

/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';

/**
 * recoil
 */
import { useRecoilState, useSetRecoilState } from 'recoil';

/**
 * store
 */
import { authState, counterState } from 'src/store';
import UserVO from 'src//vo/UserVO';

/**
 * db
 */
import UserService from 'src/service/UserService';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';

function UserRegistration({
  userList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('getStaticProps() :: no hooks');
  const [auth, setAuth] = useRecoilState(authState);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    paper2: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
  }));

  useEffect(() => {
    const user = userList[0] || null;
    setAuth((currVal) => ({ ...currVal, user }));
    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, []);

  const classes = useStyles();

  return (
    <ApoLayout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>회원상태</Paper>
          </Grid>
          <Grid item xs={9}>
            <TextField id="outlined-basic" label="회원상태" variant="outlined" fullWidth/>
          </Grid>
        </Grid>
      </div>
    </ApoLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ userList: UserVO[] }> = async ({
  params,
}) => {
  // const userList: UserVO[] = await UserService.selectUser();

  return {
    props: {
      userList: [],
    },
  };
};

export default UserRegistration;
