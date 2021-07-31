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
  selector,
  atom,
  useRecoilValue,
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

import { Auth, handleAuthentication } from 'src/store/auth';
import { tempFahrenheit, tempCelsius } from 'src/store/test';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

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

  // const [login, setLogin] = useRecoilState(handleLogin);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { data, status } = await HttpClient.post(
        '/login',
        new UserVO({ userId: id, userPassword: password }),
      );
      const { success, result } = new OTAResponse<UserVO>(data);

      if (success) {
        setAuth((auth) => ({ user: result[0], isLoggedIn: true }));
      }
    } catch (e) {
      console.error(e);
    }
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
