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
  //   const { data: user, mutate: mutateUser } = useSWR('/api/user');

  const { state, contents } = useRecoilValueLoadable(handleAuthentication);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !contents) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !contents) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && contents)
    ) {
      Router.push(redirectTo);
    }
    console.log({ contents });
  }, [state, contents, redirectIfFound, redirectTo]);

  return [contents, state];
}
