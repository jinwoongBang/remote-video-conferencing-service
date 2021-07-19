import React, { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';
import UserVO from 'src/vo/UserVO';

function EventManagerRegistration({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div>
        <h1>eventManagerRegistration</h1>
      </div>
      <div>
        <Counter />
      </div>
    </div>
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
