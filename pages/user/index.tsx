import React, { useEffect } from 'react';

/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';

/**
 * recoil
 */
import { useRecoilState, useSetRecoilState } from 'recoil';

/**
 * store
 */
import { authState, counterState } from 'src/store';
import UserVO from 'src//vo/UserVO';

/**
 * db
 */
import UserService from 'pages/api/service/UserService';

function User({ userList }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('getStaticProps() :: no hooks');
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const user = userList[0] || null;
    setAuth((currVal) => ({ ...currVal, user }));
    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, []);

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
export const getStaticProps: GetStaticProps<{ userList: UserVO[] }> = async ({
  params,
}) => {
  const userList: UserVO[] = await UserService.selectUser();

  return {
    props: {
      userList,
    },
  };
};

export default User;
