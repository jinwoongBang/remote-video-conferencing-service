import React, { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { SeminarResponse, Data } from '../api/before';
import Counter from '../../src/components/Counter';
import { authState, counterState } from '../../src/store';
import UserVO from '../../src/vo/UserVO';
import HttpClient from 'src/common/framework/HttpClient';

function User({ result }: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <h1>User</h1>
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

  const res = await HttpClient.get('http://localhost:3000/api/auth');
  console.log('getStaticProps()');
  console.log(res.data);
  const { result }: SeminarResponse<UserVO> = await res.data;

  return {
    props: {
      result,
    },
  };
};

export default User;
