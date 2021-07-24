import React, { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';
import UserVO from 'src/vo/UserVO';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';

function Preference({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ApoLayout>
      <div>
        <div>
          <h1>Preference</h1>
        </div>
        <div>
          <Counter />
        </div>
      </div>
    </ApoLayout>
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

export default Preference;
