/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  Search,
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
  table: {
    minWidth: 650,
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
  }, [users.contents.result, users?.state]);

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
    {
      field: 'management',
      headerName: '관리',
      width: 150,
      renderCell: () => (
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.modifyButton}
          startIcon={<Person />}
          onClick={handleSubmitResetOperator}
        >
          관리
        </Button>
      ),
    },
  ];

  console.log('row222row222: ', rows);
  const handleSubmitOperator = useCallback(() => {
    setUserSearchState({
      userId: 'ram',
    });
    reload(0 as any);

    console.log('click row222row222: ', users.contents.result);
  }, [reload, setUserSearchState, users.contents.result]);
  const handleSubmitResetOperator = useCallback(() => {
    setUserSearchState({
      userId: '',
    });
    reload(0 as any);

    console.log('reset click row222row222: ', users.contents.result);
  }, [reload, setUserSearchState, users.contents.result]);

  const bkbk = userList[0];

  useEffect(() => {
    const user = userList[0] || null;
    console.log('getStaticProps() :: useEffect (mount)', userList);
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)', userList[0]);
    };
  }, [userList]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDatePicker = useCallback(() => {
    console.log('click event');
  }, []);

  switch (users?.state) {
    case 'hasValue':
      return (
        <ApoLayout>
          <div>
            <div>
              <h1>User </h1>
              <h2>{auth.user && auth.user.NAME}</h2>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell width="10%" rowSpan={5}>
                        상세 검색조건
                      </TableCell>
                      <TableCell align="center" width="8%">
                        가입날짜
                      </TableCell>
                      <TableCell colSpan={5} align="left">
                        <Grid item xs={12}>
                          <DatePicker
                            selectsRange={true}
                            c
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update: any) => {
                              setDateRange(update);
                            }}
                            monthsShown={2}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            isClearable={true}
                          />
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" width="10%" colSpan={1}>
                        상태
                      </TableCell>
                      <TableCell colSpan={5}>상태 radio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" width="10%" colSpan={1}>
                        이벤트 명
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Grid item xs={12} className={classes.inputContainer}>
                          <TextField
                            fullWidth
                            id="standard-required"
                            placeholder="이벤트 명을 입력해주세요."
                            variant="outlined"
                          />
                        </Grid>
                      </TableCell>
                      <TableCell align="center" width="10%" colSpan={1}>
                        이벤트 코드
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Grid item xs={12} className={classes.inputContainer}>
                          <TextField
                            fullWidth
                            id="standard-required"
                            placeholder="이벤트 코드를 입력해주세요."
                            variant="outlined"
                          />
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" width="10%">
                        회원명
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Grid item xs={12} className={classes.inputContainer}>
                          <TextField
                            fullWidth
                            id="standard-required"
                            placeholder="회원명을 입력해주세요.."
                            variant="outlined"
                          />
                        </Grid>
                      </TableCell>
                      <TableCell align="center" width="10%">
                        회원 아이디
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Grid item xs={12} className={classes.inputContainer}>
                          <TextField
                            fullWidth
                            id="standard-required"
                            placeholder="회원 아이디를 입력해주세요."
                            variant="outlined"
                          />
                        </Grid>
                      </TableCell>
                      <TableCell align="center" width="10%">
                        핸드폰 번호
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Grid item xs={12} className={classes.inputContainer}>
                          <TextField
                            fullWidth
                            id="standard-required"
                            placeholder="핸드폰 번호를 입력해주세요."
                            variant="outlined"
                          />
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>검색 버튼</TableCell>
                      <TableCell colSpan={2}>
                        <Button
                          fullWidth
                          color="primary"
                          variant="outlined"
                          size="large"
                          startIcon={<Search />}
                        >
                          검색
                        </Button>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Button
                          fullWidth
                          color="primary"
                          variant="outlined"
                          size="large"
                        >
                          초기화
                        </Button>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Button
                          fullWidth
                          color="primary"
                          variant="outlined"
                          size="large"
                        >
                          엑셀
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
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
              <h2>{auth.user && auth.user.NAME}</h2>
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
