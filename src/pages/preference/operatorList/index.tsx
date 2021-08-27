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
import { useSetRecoilState } from 'recoil';

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
import OperatorListTable from 'src/components/operatorList/OperatorList';

import UserVO from 'src/vo/UserVO';
import { AuthorityVO } from 'src/vo';

/**
 * Common
 */
import { AuthorityKey } from 'src/common/enum/authority';

/**
 * Service
 */
import AuthorityService from 'src/service/AuthorityService';
import { authorityState } from 'src/store/authority';

function OperatorList({
  authorityList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const setAuthorityList = useSetRecoilState(authorityState);

  useEffect(() => {
    setAuthorityList(authorityList);
  }, []);

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
export const getStaticProps: GetStaticProps<{ authorityList: AuthorityVO[] }> =
  async ({ params }) => {
    const authorityList = await AuthorityService.selectAuthorityListByKeys({
      authorityKeys: Object.values(AuthorityKey),
    });
    return {
      props: {
        authorityList,
      },
    };
  };

export default OperatorList;
