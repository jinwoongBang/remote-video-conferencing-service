/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

/**
 * Libarary
 */
import { useForm } from 'react-hook-form';

import Table from '@material-ui/core/Table';
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
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Search, LeakRemove } from '@material-ui/icons';

import {
  userSearchState,
  forceReloadUserListState,
  userListSelector,
} from 'src/store/user';
import Loading from 'src/components/Loading';

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

const Board = () => {
  const [users, reload] = useRecoilStateLoadable(userListSelector);

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
        }))!
      : [];
  }, [users.contents.result, users?.state]);

  const columns: GridColDef[] = [
    { field: 'regDate', headerName: '?????????', width: 150 },
    { field: 'eventCode', headerName: '?????????(code)', width: 150 },
    { field: 'status', headerName: '??????', width: 150 },
    { field: 'userId', headerName: '?????????', width: 150 },
    { field: 'pw', headerName: '????????????', width: 150 },
    { field: 'userName', headerName: '????????????', width: 150 },
    { field: 'PhoneNumber', headerName: '?????????', width: 150 },
    { field: 'email', headerName: '?????????', width: 150 },
    { field: 'loginInfo', headerName: '???????????????', width: 150 },
  ];

  switch (users?.state) {
    case 'hasValue':
      return (
        <div style={{ marginTop: 30, height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      );

    case 'hasError':
      return <div>Error...</div>;

    case 'loading':
      return (
        <div>
          <Loading />
        </div>
      );
  }
};

function UserView({
  userList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('user getStaticProps() :: no hooks', userList);
  const [auth, setAuth] = useRecoilState(authState);
  const classes = useStyles();

  const [users, reload] = useRecoilStateLoadable(userListSelector);
  const [force, setForce] = useRecoilState(forceReloadUserListState);
  const [userSearch, setUserSearchState] = useRecoilState(userSearchState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('user search: ', data);
    setUserSearchState(data);
  };

  useEffect(() => {
    // const user = userList[0] || null;
    // console.log('getStaticProps() :: useEffect (mount)', userList);
    return () => {
      // console.log('getStaticProps() :: useEffect (unmount)', userList[0]);
    };
  }, [userList]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDatePicker = useCallback(() => {
    console.log('click event');
  }, []);

  return (
    <ApoLayout>
      <div>
        <div>
          <h3>
            TODO 0901 1. ???????????? ?????? 2. ?????? ???????????? ???????????? 3.????????? ??????
            ??? ????????? ??? ?????? ????????? ?????? user??? ????????? ??????????????????
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell variant="head" colSpan={12}>
                      <h3>?????? ????????????</h3>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Grid container alignItems="center" spacing={4}>
                        <Grid item xs={1}>
                          ????????????
                        </Grid>
                        <Grid item xs={4}>
                          <DatePicker
                            selectsRange={true}
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
                        <Grid item xs={1}>
                          ??????
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl component="fieldset">
                            <RadioGroup
                              id="status"
                              row
                              {...register('status')}
                              defaultValue="s1"
                              aria-label="gender"
                            >
                              <FormControlLabel
                                value="s1"
                                control={<Radio />}
                                label="??????1"
                              />
                              <FormControlLabel
                                value="s2"
                                control={<Radio />}
                                label="??????2"
                              />
                              <FormControlLabel
                                value="s3"
                                control={<Radio />}
                                label="Other"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Grid container alignItems="center" spacing={4}>
                        <Grid item xs={1}>
                          ???????????????
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            id="eventCode"
                            {...register('eventCode')}
                            placeholder="????????? ????????? ??????????????????."
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={1}>
                          ????????????
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="eventName"
                            {...register('eventName')}
                            placeholder="????????? ?????? ??????????????????."
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Grid container alignItems="center" spacing={4}>
                        <Grid item xs={1}>
                          ?????????
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            id="name"
                            {...register('name')}
                            placeholder="???????????? ??????????????????.."
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={1}>
                          ?????? ?????????
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            id="userId"
                            {...register('userId')}
                            placeholder="?????? ???????????? ??????????????????."
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={1}>
                          ????????? ??????
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            id="phoneNumber"
                            {...register('phoneNumber')}
                            placeholder="????????? ????????? ??????????????????."
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>?????? ??????</TableCell>
                    <TableCell colSpan={2}>
                      <Button
                        fullWidth
                        color="primary"
                        variant="outlined"
                        size="large"
                        type="submit"
                        startIcon={<Search />}
                      >
                        ??????
                      </Button>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        size="large"
                        startIcon={<LeakRemove />}
                        onClick={() => {
                          setValue('eventCode', '');
                          setValue('eventName', '');
                          setValue('name', '');
                          setValue('phoneNumber', '');
                          setValue('userId', '');
                          setValue('status', 's1');
                        }}
                      >
                        ?????????
                      </Button>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Button
                        fullWidth
                        color="inherit"
                        variant="outlined"
                        size="large"
                      >
                        ??????
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </form>
        </div>

        <Board />
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

export default UserView;
