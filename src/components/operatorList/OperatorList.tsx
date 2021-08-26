import React, { useCallback, useState, useMemo, useEffect } from 'react';
/**
 * Recoil
 */
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from 'recoil';

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
import {
  getOperatorListSelector,
  GetOperatorListSelectorType,
} from 'src/store/operator';
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
  tbody: {
    width: '100%',
  },
}));

function OperatorListTable() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const userListLoadable = useRecoilValueLoadable<GetOperatorListSelectorType>(
    getOperatorListSelector({ page: page - 1, returnCount: 10 }),
  );

  const isLoading = useMemo(() => {
    const { state } = userListLoadable;
    return state !== 'hasError' && state === 'loading';
  }, [userListLoadable.state]);

  const pagination = useMemo(() => {
    const { state } = userListLoadable;
    return state === 'hasValue'
      ? userListLoadable.getValue().pagination
      : undefined;
  }, [userListLoadable.state]);

  /**
   * TODO:
   *  prefetch 를 사용해 페이지네이션 정보를 받아와야함
   */
  useEffect(() => {}, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [],
  );

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
          <TableBody className={classes.tbody}>
            {!isLoading ? (
              userListLoadable
                .getValue()
                .operatorList.map((user) => (
                  <OperatorItem key={user.ID} operator={user} />
                ))
            ) : (
              <Loading />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="center">
        <Grid item>
          <Pagination
            disabled={isLoading || !pagination}
            color="primary"
            count={pageCount}
            page={page}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default OperatorListTable;
