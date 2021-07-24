import React, { useEffect, useState } from 'react';

/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';

/**
 * recoil
 */
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

/**
 * store
 */
import { authState, counterState } from 'src/store';
import UserVO from 'src//vo/UserVO';

/**
 * Hooks
 */
import useUser from 'src/common/hooks/useUser';
/**
 * Recoil
 */
import { useRecoilValue } from 'recoil';
import { handleAuthentication } from 'src/store/auth';

interface ErrorProps {
  isError: boolean;
  message: string;
}

function Login({ userList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [contents, state] = useUser({ redirectTo: '/', redirectIfFound: true });

  const [error, setError] = useState<ErrorProps>({
    isError: false,
    message: '',
  });

  const handleSubmit = async (event: React.MouseEvent) => {
    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await alert('login');
  };

  return (
    <div>
      <h1>로그인</h1>
      <div>
        <span>아이디</span>
        <input type="text" />
      </div>
      <div>
        <span>패스워드</span>
        <input type="text" />
      </div>
      <div>
        <button onClick={handleSubmit}>로그인</button>
      </div>
    </div>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ userList: UserVO[] }> = async ({
  params,
}) => {
  return {
    props: {
      userList: [],
    },
  };
};

export default Login;
