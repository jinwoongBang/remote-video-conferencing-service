/**
 * React
 */
import { useEffect, useState } from 'react';

/**
 * Next
 */
import Router, { useRouter } from 'next/router';

/**
 * Recoil
 */
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import authState, { Auth, handleAuthentication } from 'src/store/auth';
import HttpClient from '../framework/HttpClient';

type User = {
  isLoggedIn: boolean;
};

export default function useAuth({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const router = useRouter();

  const [auth, setAuth] = useRecoilState<Auth>(authState);

  const handleAuthentication = async () => {
    try {
      const response = await HttpClient.get('/auth');
      const { result } = await response.data;
      setAuth(() => ({ user: result[0], isLoggedIn: true }));
    } catch (e) {
      console.error(e);
      setAuth(() => ({ user: null, isLoggedIn: false }));
    }
  };

  useEffect(() => {
    handleAuthentication();
  }, [router, router.pathname]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      router.pathname === '/login' && router.push('/');
      console.log('[handleAuthentication] success');
    } else {
      router.pathname !== '/login' && router.push('/login');
      console.log('[handleAuthentication] failure');
    }
  }, [auth.isLoggedIn]);

  return { auth };
}
