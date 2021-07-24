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
import authState, { handleAuthentication } from 'src/store/auth';

type User = {
  isLoggedIn: boolean;
};

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { state, contents } = useRecoilValueLoadable(handleAuthentication);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    console.log({ state, contents });
    if (state === 'hasValue' && contents) {
      Router.push(redirectTo);
    } else if (auth.isLoggedIn) {
      Router.push(redirectTo);
    }
  }, [state, contents, auth.isLoggedIn]);

  return [contents, state];
}
