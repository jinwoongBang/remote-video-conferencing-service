import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
  useSetRecoilState,
  useRecoilStateLoadable,
} from 'recoil';

/**
 * store
 */
import { authState, counterState } from 'src/store';
import UserVO, { User } from 'src//vo/UserVO';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

/**
 * db
 */
import UserService from 'src/service/UserService';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';

/**
 *  Material UI
 */
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Cancel,
  Copyright,
  Create,
  HowToReg,
  Mail,
  Person,
  PhoneAndroid,
  SecurityRounded,
  SecuritySharp,
  VpnKey,
} from '@material-ui/icons';

import { useRecoilValueLoadable } from 'recoil';
import {
  userSearchState,
  forceReloadUserListState,
  userListSelector,
} from 'src/store/user';

const useStyles = makeStyles((theme: Theme) => ({
  inputLabelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px',
  },
  inputContainer: {
    padding: '15px',
  },
  buttonContaier: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px',
    gap: '10px',
  },
  modifyButton: {
    width: '200px',
  },
  divider: {
    padding: '15px',
  },
}));

function UserView({
  userList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('user getStaticProps() :: no hooks', userList);
  const [auth, setAuth] = useRecoilState(authState);
  const classes = useStyles();
  // todo 0724 데이터가 들어가게 수정 필요 !!

  // const boardList = useRecoilValueLoadable(boardListSelector);
  const [users, reload] = useRecoilStateLoadable(userListSelector);
  const [force, setForce] = useRecoilState(forceReloadUserListState);
  const [userSearch, setUserSearchState] = useRecoilState(userSearchState);

  console.log('click boardSearchState: ' + userSearch.userId);
  console.log('click users: ', users?.contents);
  console.log('users?.state: ', users?.state);
  let rows: GridRowsProp = useMemo(() => {
    return users?.state === 'hasValue'
      ? users.contents.result.map((x, index) => ({
          id: x.ID,
          regDate: x.DATE_OF_CREATED,
          eventCode: x.EVENT_ID,
          status: x.STATUS,
          userId: x.USER_ID,
          pw: x.PASSWORD,
          userName: x.NAME,
          PhoneNumber: x.PHONE_NUMBER,
          email: x.EMAIL,
          loginInfo: x.STATUS,
          management: 'management?? 뭐  넣ㅓㅏ', //todo 0810 회원쪽도 어떻게 넣을지 봐야할 듯
        }))!
      : [];
  }, []);

  if (users?.state === 'hasValue') {
    console.log('click users: ', users.contents.result[0]);
    rows = users.contents.result.map((x, index) => ({
      id: x.ID,
      regDate: x.DATE_OF_CREATED,
      eventCode: x.EVENT_ID,
      status: x.STATUS,
      userId: x.USER_ID,
      pw: x.PASSWORD,
      userName: x.NAME,
      PhoneNumber: x.PHONE_NUMBER,
      email: x.EMAIL,
      loginInfo: x.STATUS,
      management: 'management?? 뭐  넣ㅓㅏ', //todo 0810 회원쪽도 어떻게 넣을지 봐야할 듯
    }));
  }

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

  console.log('row222row222: ', rows);
  const handleSubmitOperator = useCallback(() => {
    setUserSearchState({
      userId: 'ram',
    });
    reload(0 as any);

    console.log('click row222row222: ', users.contents.result);
  }, []);
  const handleSubmitResetOperator = useCallback(() => {
    setUserSearchState({
      userId: '',
    });
    reload(0 as any);

    console.log('reset click row222row222: ', users.contents.result);
  }, []);

  const bkbk = userList[0];

  useEffect(() => {
    const user = userList[0] || null;
    setAuth((currVal) => ({ ...currVal, user }));
    console.log('getStaticProps() :: useEffect (mount)', userList);
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)', userList[0]);
    };
  }, []);

  switch (users?.state) {
    case 'hasValue':
      return (
        <ApoLayout>
          <div>
            <div>
              <h1>User </h1>
              <h2>{auth.user && auth.user.userName}</h2>
            </div>

            <div style={{ height: 300, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
            <Grid item xs={12} className={classes.buttonContaier}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.modifyButton}
                startIcon={<Create />}
                onClick={handleSubmitOperator}
              ></Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.modifyButton}
                startIcon={<Person />}
                onClick={handleSubmitResetOperator}
              ></Button>
            </Grid>
          </div>
        </ApoLayout>
      );
    case 'loading':
      return (
        <ApoLayout>
          <div>
            <div>
              <h1>User </h1>
              <h2>{auth.user && auth.user.userName}</h2>
            </div>

            <div style={{ height: 300, width: '100%' }}>
              <div>Loading...</div>
            </div>

            <div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.modifyButton}
                startIcon={<Create />}
                onClick={handleSubmitOperator}
              >
                등록
              </Button>
            </div>
          </div>
        </ApoLayout>
      );
    case 'hasError':
      throw <div>Error...</div>;
  }
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

export default UserView;
