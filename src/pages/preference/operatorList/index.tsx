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
 *  Material UI
 */
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

/**
 * Compoents
 */
import Counter from 'src/components/Counter';
import AppLayout from 'src/components/AppLayout';
import OperatorListTable from 'src/components/OperatorList';

import UserVO from 'src/vo/UserVO';

function OperatorList({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppLayout>
      <Grid container>
        <Grid item xs={12}>
          <OperatorListTable />
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

export default OperatorList;
