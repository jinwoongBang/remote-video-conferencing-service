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

function Event({ result }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppLayout>
      <Grid container component="article">
        <Grid item xs={12}>
          <section>
            <SearchForm />
          </section>
          <section>
            <EventList />
          </section>
        </Grid>
      </Grid>
    </AppLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ result: any[] }> = async ({
  params,
}) => {
  PreferenceService.selectPreferenceListByGroupKey({
    preferenceKey: PreferenceGroupKey.EventOptions,
  });
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      result: [],
    },
  };
};

export default Event;
