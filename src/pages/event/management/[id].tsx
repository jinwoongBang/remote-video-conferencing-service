/**
 * React
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

/**
 * Library
 */
import { useRouter } from 'next/router';

/**
 * Material UI
 */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

/**
 * Hooks
 */
import useAuth from 'src/common/hooks/useAuth';

/**
 * Components
 */
import AppLayout from 'src/components/AppLayout';
import EventList from 'src/components/eventList/EventList';
import SearchForm from 'src/components/eventList/SearchForm';
import eventOption from 'src/service/eventOption';
import PreferenceService from 'src/service/PreferenceService';
import { PreferenceGroupKey } from 'src/common/enum/preference';
import { PreferenceVO } from 'src/vo';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    maxWidth: '100%',
  },
}));

function EventManagement({
  eventOptionList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  const { auth } = useAuth();

  return (
    <main>
      <Grid container>
        <Grid item xs={12}>
          <section className={classes.section}>이벤트 관리 페이지</section>
        </Grid>
      </Grid>
    </main>
  );
}

export const getStaticProps: GetStaticProps<{
  eventOptionList: PreferenceVO[];
}> = async ({ params }) => {
  const eventId = params?.id;

  const eventOptionList =
    await PreferenceService.selectPreferenceListByGroupKey({
      preferenceKey: PreferenceGroupKey.EventOptions,
    });

  return {
    props: {
      eventOptionList,
    },
  };
};

export default EventManagement;
