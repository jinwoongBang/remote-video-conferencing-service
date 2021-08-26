import React, { useCallback, useState, useMemo } from 'react';
/**
 * Recoil
 */
import { useRecoilStateLoadable, useRecoilValue } from 'recoil';

/**
 * Library
 */
import clsx from 'clsx';

/**
 * Material UI
 */
import { makeStyles, Theme } from '@material-ui/core/styles';

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
import Pagination from '@material-ui/lab/Pagination';

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

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
import { authorityState } from 'src/store/authority';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    height: 'calc(100vh - 240px)',
    marginBottom: theme.spacing(2),
  },
}));

function OperatorListTable() {
  const classes = useStyles();
  const [userListLoadable, reloadUserList] = useRecoilStateLoadable<
    OperatorVO[]
  >(getOperatorListSelector);

  const isLoading = useMemo(() => {
    return userListLoadable.state === 'loading';
  }, [userListLoadable.state]);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width={50} align="center">
                번호
              </TableCell>
              <TableCell width={60} align="center">
                상태
              </TableCell>
              <TableCell align="center">아이디</TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">환경설정</TableCell>
              <TableCell align="center">회원관리</TableCell>
              <TableCell align="center">이벤트관리</TableCell>
              <TableCell align="center">특별관리</TableCell>
              <TableCell align="center">로그횟수</TableCell>
              <TableCell align="center">등록일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              userListLoadable
                .getValue()
                .map((user) => <OperatorItem key={user.ID} operator={user} />)
            ) : (
              <Loading />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="center">
        <Grid item>
          <Pagination count={10} color="primary" />
        </Grid>
      </Grid>
    </div>
  );
}

export default OperatorListTable;
