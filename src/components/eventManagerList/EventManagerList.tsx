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
  eventManagerListPaginationState,
  getEventManagerListSelector,
  GetEventManagerListSelectorType,
} from 'src/store/eventManager';

/**
 * Components
 */
import Loading from 'src/components/Loading';
import EventManagerItem from 'src/components/eventManagerList/EventManagerItem';

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

type EventManagerListTableProps = {};

function EventManagerListTable({}: EventManagerListTableProps) {
  const classes = useStyles();

  const [page, setPage] = useRecoilState(eventManagerListPaginationState);

  const userListLoadable =
    useRecoilValueLoadable<GetEventManagerListSelectorType>(
      getEventManagerListSelector({
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
              {!isLoading
                ? userListLoadable.getValue().eventManagerList.length
                : 0}
            </strong>
            ???
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell width={50} />
              <TableCell width={50} align="center">
                ??????
              </TableCell>
              <TableCell align="center">?????????</TableCell>
              <TableCell align="center">?????????</TableCell>
              <TableCell align="center">??????</TableCell>
              <TableCell align="center">??????</TableCell>
              <TableCell align="center">????????????</TableCell>
              <TableCell align="center">?????????</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {!isLoading ? (
              userListLoadable
                .getValue()
                .eventManagerList.map((user) => (
                  <EventManagerItem key={user.ID} eventManager={user} />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>
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

export default EventManagerListTable;
