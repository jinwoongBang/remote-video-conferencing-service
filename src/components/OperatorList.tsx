import React from 'react';
/**
 * Recoil
 */
import { useRecoilStateLoadable } from 'recoil';

/**
 * Library
 */
import clsx from 'clsx';

/**
 * Material UI
 */
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

import {
  CircularProgress,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@material-ui/data-grid';

/**
 * Store
 */
import { getOperatorListSelector } from 'src/store/operator';
import { User } from 'src/vo';
import OperatorVO from 'src/vo/OperatorVO';

/**
 * Components
 */
import Loading from 'src/components/Loading';

const columns: GridColDef[] = [
  {
    field: 'ID',
    headerName: '번호',
    width: 90,
    type: 'number',
  },
  {
    field: 'STATUS',
    headerName: '상태',
    type: 'number',
    width: 90,
  },
  {
    field: 'USER_ID',
    headerName: 'ID',
    // type: 'number',
    width: 90,
  },
  {
    field: 'NAME',
    headerName: '이름',
    width: 150,
  },
  {
    field: 'PREFERENCE_ROLE',
    headerName: '환경설정',
    width: 120,
  },
  {
    field: 'USER_ROLE',
    headerName: '회원관리',
    width: 120,
  },
  {
    field: 'EVENT_ROLE',
    headerName: '이벤트관리',
    width: 120,
  },
  {
    field: 'SPECIAL_ROLE',
    headerName: '특별관리',
    width: 120,
  },
  {
    field: 'LOG_COUNT',
    headerName: '로그 횟수',
    width: 150,
  },
  {
    field: 'DATE_OF_CREATED',
    headerName: '등록일',
    width: 150,
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    height: 'calc(100vh - 200px)',
    marginBottom: theme.spacing(2),
  },
}));

function OperatorListTable() {
  const classes = useStyles();
  const [userListLoadable, reloadUserList] = useRecoilStateLoadable<
    OperatorVO[]
  >(getOperatorListSelector);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>번호</TableCell>
              <TableCell align="right">상태</TableCell>
              <TableCell align="right">아이디</TableCell>
              <TableCell align="right">이름</TableCell>
              <TableCell align="right">환경설정</TableCell>
              <TableCell align="right">회원관리</TableCell>
              <TableCell align="right">이벤트관리</TableCell>
              <TableCell align="right">특별관리</TableCell>
              <TableCell align="right">로그횟수</TableCell>
              <TableCell align="right">등록일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {userListLoadable.state === 'hasValue' ? (
              <DataGrid
                rows={userListLoadable.getValue().map((operator) => ({
                  id: operator.ID,
                  ...operator,
                }))}
                columns={columns}
                pageSize={100}
                // checkboxSelection
                disableSelectionOnClick
              />
            ) : (
              <Loading />
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OperatorListTable;
