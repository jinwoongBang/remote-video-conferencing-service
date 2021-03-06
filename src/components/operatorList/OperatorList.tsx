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
  operatorListPaginationState,
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
  header: {
    height: '30px',
  },
  postCountContainer: {
    '& strong': {
      fontWeight: 'bold',
      fontSize: '1.2em',
      margin: '0 2px',
    },
  },
  paper: {
    width: '100%',
    height: 'calc(100vh - 260px)',
    marginBottom: theme.spacing(2),
  },
  tbody: {
    width: '100%',
  },
}));

type OperatorListTableProps = {};

function OperatorListTable({}: OperatorListTableProps) {
  const classes = useStyles();

  const [page, setPage] = useRecoilState(operatorListPaginationState);

  const userListLoadable = useRecoilValueLoadable<GetOperatorListSelectorType>(
    getOperatorListSelector({
      page: page.pageNumber,
      returnCount: page.returnCount,
    }),
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

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage((state) => ({ ...state, pageNumber: value - 1 }));
    },
    [],
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        component="article"
        className={classes.header}
      >
        <Grid item>
          <Typography variant="body1" className={classes.postCountContainer}>
            ??? <strong>{pagination?.itemCount || 0}</strong>??? ???{' '}
            <strong>
              {!isLoading ? userListLoadable.getValue().operatorList.length : 0}
            </strong>
            ???
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width={50} align="center">
                ??????
              </TableCell>
              <TableCell width={60} align="center">
                ??????
              </TableCell>
              <TableCell align="center">?????????</TableCell>
              <TableCell align="center">??????</TableCell>
              <TableCell align="center">????????????</TableCell>
              <TableCell align="center">????????????</TableCell>
              <TableCell align="center">???????????????</TableCell>
              <TableCell align="center">????????????</TableCell>
              <TableCell align="center">????????????</TableCell>
              <TableCell align="center">?????????</TableCell>
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
              <TableRow>
                <TableCell colSpan={11}>
                  <Loading />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="center">
        <Grid item>
          <Pagination
            disabled={isLoading || !pagination}
            color="primary"
            count={pagination?.pageCount}
            page={page.pageNumber + 1}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default OperatorListTable;
