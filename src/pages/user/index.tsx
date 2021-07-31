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
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

/**
 * db
 */
import UserService from 'src/service/UserService';


/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';


const columns: GridColDef[] = [
  { field: 'regDate', headerName: '가입일', width: 150 },
  { field: 'eventCode', headerName: '이벤트(code)', width: 150 },
  { field: 'status', headerName: '상태', width: 150 },
  { field: 'userId', headerName: '아이디', width: 150 },
  { field: 'pw', headerName: '비밀번호', width: 150 },
  { field: 'userName', headerName: '회원이름', width: 150 },
  { field: 'PhoneNumber', headerName: '연락처', width: 150 },
  { field: 'email', headerName: '이메일', width: 150 },
  { field: 'loginInfo', headerName: '로그인정보', width: 150 },
  { field: 'management', headerName: '관리', width: 150 },
];

function User({ userList }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('getStaticProps() :: no hooks');
  const [auth, setAuth] = useRecoilState(authState);

  // todo 0724 데이터가 들어가게 수정 필요 !! 
  const rows: GridRowsProp = [
    { 
      id: 1, 
      regDate: '2021 test', 
      eventCode: 'event Code test', 
      status: 'status test',
      userId: 'id test',
      pw: 'pw test',
      userName: 'userName test',
      PhoneNumber: 'PhoneNumber test',
      email: 'email test', 
      loginInfo: 'loginInfo test', 
      management: 'management test', 
    },
    { 
      id: 2, 
      regDate: '2021 test2', 
      eventCode: 'event Code test', 
      status: 'status test',
      userId: 'id test',
      pw: 'pw test',
      userName: 'userName test',
      PhoneNumber: 'PhoneNumber test',
      email: 'email test', 
      loginInfo: 'loginInfo test', 
      management: 'management test', 
    },
    { 
      id: 3, 
      regDate: '2021 test3', 
      eventCode: 'event Code test', 
      status: 'status test',
      userId: 'id test',
      pw: 'pw test',
      userName: 'userName test',
      PhoneNumber: 'PhoneNumber test',
      email: 'email test', 
      loginInfo: 'loginInfo test', 
      management: 'management test', 
    },
  ];
  

  useEffect(() => {
    const user = userList[0] || null;
    setAuth((currVal) => ({ ...currVal, user }));
    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, []);

  return (
    <ApoLayout>
      <div>
        <div>
          <h1>User</h1>
          <h2>{auth.user && auth.user.userName}</h2>
        </div>
        
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>

      </div>
    </ApoLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ userList: UserVO[] }> = async ({
  params,
}) => {
  const userList: UserVO[] = await UserService.selectUserList();

  return {
    props: {
      userList,
    },
  };
};

export default User;
