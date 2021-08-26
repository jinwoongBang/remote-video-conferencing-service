import React, { useCallback, useState } from 'react';
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
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@material-ui/core';

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

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
import OperatorItem from 'src/components/operatorList/OperatorItem';

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
      <TableContainer component={Paper} className={classes.paper}>
        <Table stickyHeader aria-label="collapsible table">
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
            {userListLoadable.state === 'hasValue' ? (
              userListLoadable
                .getValue()
                .map((user) => <OperatorItem key={user.ID} operator={user} />)
            ) : (
              <Loading />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OperatorListTable;
