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
import { useRecoilValue } from 'recoil';
import { getCurrentUser } from 'src/store/auth';

type User = {
  isLoggedIn: boolean;
};

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  //   const { data: user, mutate: mutateUser } = useSWR('/api/user');
  const user = useRecoilValue(getCurrentUser);

  // useEffect(() => {
  //   // // if no redirect needed, just return (example: already on /dashboard)
  //   // // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
  //   // if (!redirectTo || !user) return;

  //   // if (
  //   //   // If redirectTo is set, redirect if the user was not found.
  //   //   (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
  //   //   // If redirectIfFound is also set, redirect if the user was found
  //   //   (redirectIfFound && user?.isLoggedIn)
  //   // ) {
  //   //   Router.push(redirectTo);
  //   // }
  //   // console.log({ user });
  // }, [user, redirectIfFound, redirectTo]);

  // return {
  //   user,
  //   //mutateUser
  // };
}
