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
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { handleAuthentication } from 'src/store/auth';

type User = {
  isLoggedIn: boolean;
};

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { state, contents } = useRecoilValueLoadable(handleAuthentication);

  useEffect(() => {
    console.log({ state, contents });
    if (state === 'hasValue' && contents) {
      Router.push(redirectTo);
    }
  }, [state, contents]);

  return [contents, state];
}
