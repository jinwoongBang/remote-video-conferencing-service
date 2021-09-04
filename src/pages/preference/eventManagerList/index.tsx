/**
 * React
 */
import React, { useEffect } from 'react';

/**
 * Nextjs
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';

/**
 * MUI
 */
import { Grid } from '@material-ui/core';

/**
 * VO
 */
import UserVO from 'src/vo/UserVO';

/**
 * Components
 */
import AppLayout from 'src/components/AppLayout';
import EventManagerListTable from 'src/components/eventManagerList/EventManagerList';

function EventManagerList({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppLayout>
      <Grid container>
        <Grid item xs={12}>
          <EventManagerListTable />
        </Grid>
      </Grid>
    </AppLayout>
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

export default EventManagerList;
