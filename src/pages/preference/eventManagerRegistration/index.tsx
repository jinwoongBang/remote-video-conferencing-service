/**
 * React
 */
import React, { useEffect } from 'react';

/**
 * Nextjs
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

/**
 * VO
 */
import UserVO from 'src/vo/UserVO';
import EventVO from 'src/vo/EventVO';

/**
 * Components
 */
import AppLayout from 'src/components/AppLayout';
import Form from 'src/components/eventManagerRegistration/Form';
import EventService from 'src/service/EventService';

/**
 * Default Function(TSX)
 */
function EventManagerRegistration({
  eventList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppLayout>
      <Form eventList={eventList} />
    </AppLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ eventList: EventVO[] }> = async ({
  params,
}) => {
  const eventList = await EventService.selectAllEventList();
  // will receive `posts` as a prop at build time
  return {
    props: {
      eventList,
    },
  };
};

export default EventManagerRegistration;
