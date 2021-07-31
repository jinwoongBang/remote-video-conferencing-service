import React, { useCallback, useEffect, useState } from 'react';

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

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<ErrorProps>({
    isError: false,
    message: '',
  });

  const setAuth = useSetRecoilState(authState);

  // const handleSubmit = async (event: React.MouseEvent) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    alert('login');
    setAuth((auth) => ({ isLoggedIn: true, user: auth.user }));
  };

  const handleChangeId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setId(value);
    },
    [],
  );
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setPassword(value);
    },
    [],
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <div>
        <span>아이디</span>
        <input type="text" value={id} onChange={handleChangeId} />
      </div>
      <div>
        <span>패스워드</span>
        <input type="text" value={password} onChange={handleChangePassword} />
      </div>
      <div>
        <button>로그인</button>
      </div>
    </form>
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
