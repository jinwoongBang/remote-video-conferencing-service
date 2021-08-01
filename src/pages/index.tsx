/**
 * React
 */
import React, { useEffect } from 'react';

/**
 * Next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';

/**
 * Recoil
 */
import { useRecoilState, useSetRecoilState } from 'recoil';

/**
 * Material UI
 */
import { Grid } from '@material-ui/core';

/**
 * Store
 */
import { authState, counterState } from 'src/store';
import UserVO from 'src/vo/UserVO';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';
import DashboardList from 'src/components/DashboardList';

function Home({ result }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [auth, setAuth] = useRecoilState(authState);

  return (
    <ApoLayout>
      <DashboardList />
      {/* <Grid container>
        <Grid item>
        </Grid>
      </Grid> */}
    </ApoLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ result: UserVO[] }> = async ({
  params,
}) => {
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      result: [],
    },
  };
};

export default Home;
