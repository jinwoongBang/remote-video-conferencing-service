import React, { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Counter from 'src/components/Counter';
import { authState, counterState } from 'src/store';
import UserVO from 'src/vo/UserVO';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';

function Home({ result }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [auth, setAuth] = useRecoilState(authState);

  return (
    <ApoLayout>
      <div>
        <div>
          <h1>대시보드</h1>
          <h2>{auth.user && auth.user.userName}</h2>
          <h2>{auth.user && auth.user.userId}</h2>
          <h2>{auth.user && auth.user.userPassword}</h2>
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

export default Home;
