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
import * as _ from 'lodash';

/**
 * Material UI
 */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

/**
 * Hooks
 */
import useAuth from 'src/common/hooks/useAuth';

/**
 * Service
 */
import PreferenceService from 'src/service/PreferenceService';
import EventService from 'src/service/event';

/**
 * Components
 */
import { PreferenceGroupKey } from 'src/common/enum/preference';
import { PreferenceVO } from 'src/vo';
import EventOptionHandler from 'src/common/handler/EventOptionHandler';
import EventVO from 'src/vo/EventVO';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    maxWidth: '100%',
  },
}));

function EventManagement({
  event,
  eventOptionList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  const { auth } = useAuth();

  return (
    <main>
      <Grid container>
        <Grid item xs={12}>
          <section className={classes.section}>
            <Typography>{event?.TITLE}</Typography>
            <Typography>({event?.CODE})</Typography>
          </section>
        </Grid>
      </Grid>
    </main>
  );
}

async function getEventWithOptions(event: EventVO) {
  const eventList = [event];
  const eventOptionHandler = new EventOptionHandler({
    eventList,
  });
  const eventListWithOptions = (
    await eventOptionHandler.addEventOptions()
  ).getEventListInstance();

  return eventListWithOptions.length === 0 ? null : eventListWithOptions[0];
}

export async function getStaticPaths() {
  const eventIdList = await EventService.selectAllEventIdList();
  const paths = eventIdList.map((eventId) => ({
    params: {
      id: String(eventId),
    },
  }));

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps<{
  eventOptionList: PreferenceVO[];
  event: EventVO | null;
}> = async ({ params }) => {
  const eventId = params?.id;

  if (_.isEmpty(eventId)) {
    throw new Error('Event ID does not exist.');
  }

  const eventOptionList =
    await PreferenceService.selectPreferenceListByGroupKey({
      preferenceKey: PreferenceGroupKey.EventOptions,
    });

  const event = await EventService.selectOneEvent({ id: Number(eventId) });

  if (_.isEmpty(event)) {
    throw new Error('Event ID does not exist.');
  }

  const eventWithEventOptions = await getEventWithOptions(event);

  return {
    props: {
      event: eventWithEventOptions,
      eventOptionList,
    },
  };
};

export default EventManagement;
