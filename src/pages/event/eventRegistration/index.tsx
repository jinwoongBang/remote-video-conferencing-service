import React, { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import AppLayout from 'src/components/AppLayout';
import ServerVO from 'src/vo/ServerVO';
import ServerService from 'src/service/ServerService';
import PreferenceService from 'src/service/PreferenceService';
import { PreferenceVO } from 'src/vo';

function EventRegistration({
  serverList,
  eventOptionList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppLayout>
      <div>
        <div>
          <h1>Event Registration</h1>
        </div>
        <div>
          <h1>내용</h1>
          {serverList.map((serverItem) => (
            <div key={serverItem.ID}>
              <div>
                {serverItem.IP}:{serverItem.PORT}
              </div>
              <div>{serverItem.NAME}</div>
            </div>
          ))}
          <h1>이벤트 옵션 리스트</h1>
          {eventOptionList.map((eventOption) => (
            <div key={eventOption.ID}>
              <div>{eventOption.NAME}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{
  serverList: ServerVO[];
  eventOptionList: PreferenceVO[];
}> = async ({ params }) => {
  const serverList = await ServerService.selectAllServerList();
  const eventOptionList =
    await PreferenceService.selectPreferenceListByGroupKey({
      preferenceKey: 'EVENT_OPTIONS',
    });
  return {
    props: {
      serverList,
      eventOptionList,
    },
  };
};

export default EventRegistration;
