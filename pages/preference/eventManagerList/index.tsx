import React, { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { SeminarResponse, Data } from 'pages/api/before';
import Counter from 'src/components/Counter';
import { authState, counterState } from 'src/store';
import UserVO from 'src/vo/UserVO';

function EventManagerList({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('getStaticProps() :: no hooks');
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const user = result[0] || null;
    setAuth((currVal) => ({ ...currVal, user }));
    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, [result, setAuth]);

  return (
    <div>
      <div>
        <h1>EventManagerList</h1>
        <h2>{auth.user && auth.user.userName}</h2>
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
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3000/api/auth');
  console.log('getStaticProps()');
  console.log(res);
  const { result }: SeminarResponse<UserVO> = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      result,
    },
  };
};

export default EventManagerList;
