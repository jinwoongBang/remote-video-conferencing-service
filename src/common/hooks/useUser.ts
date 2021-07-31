/**
 * React
 */
import { useEffect, useState } from 'react';

/**
 * Next
 */
import Router from 'next/router';

/**
 * Recoil
 */
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import authState, { Auth, handleAuthentication } from 'src/store/auth';

type User = {
  isLoggedIn: boolean;
};

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { state, contents } = useRecoilValueLoadable(handleAuthentication);
  const [auth, setAuth] = useRecoilState<Auth>(authState);

  useEffect(() => {
    if (state === 'hasValue' && contents) {
      setAuth(() => ({ user: contents, isLoggedIn: true }));
      Router.push(redirectTo);
    } else if (auth.isLoggedIn) {
      Router.push(redirectTo);
    } else if (state === 'hasError' || !contents) {
      Router.push('/login');
    }
  }, [state]);

  return { auth, state };
}
