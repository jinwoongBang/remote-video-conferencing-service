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

/**
 * Components
 */
import AppLayout from 'src/components/AppLayout';
import Form from 'src/components/operatorRegistration/Form';

/**
 * Default Function(TSX)
 */
function EventManagerRegistration({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppLayout>
      <Form />
    </AppLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ result: UserVO[] }> = async ({
  params,
}) => {
  // will receive `posts` as a prop at build time
  return {
    props: {
      result: [],
    },
  };
};

export default EventManagerRegistration;
