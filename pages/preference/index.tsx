import React, { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { SeminarResponse, Data } from 'pages/api/before';
import Counter from 'src/components/Counter';
import { authState, counterState } from 'src/store';
import UserVO from 'src/vo/UserVO';

function Preference({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div>
        <h1>Preference</h1>
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
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      result: [],
    },
  };
};

export default Preference;
