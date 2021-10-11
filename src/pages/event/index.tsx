/**
 * React
 */
import React, { useEffect } from 'react';

/**
 * Next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

/**
 * Material UI
 */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

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

function Event({
  eventOptionList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  return (
    <AppLayout>
      <Grid container>
        <Grid item xs={12}>
          <section className={classes.section}>
            <SearchForm />
          </section>
          <section className={classes.section}>
            <EventList eventOptionList={eventOptionList} />
          </section>
        </Grid>
      </Grid>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps<{
  eventOptionList: PreferenceVO[];
}> = async ({ params }) => {
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

export default Event;
