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
// import {
//   eventManagerListPaginationState,
//   getEventManagerListSelector,
//   GetEventManagerListSelectorType,
// } from 'src/store/eventManager';

/**
 * Components
 */
import Loading from 'src/components/Loading';
// import EventManagerItem from 'src/components/eventManagerList/EventManagerItem';

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

type EventListProps = {};

function EventList({}: EventListProps) {
  const classes = useStyles();

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      // setPage((state) => ({ ...state, pageNumber: value - 1 }));
    },
    [],
  );

  return (
    <>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        component="article"
        className={classes.header}
      >
        <Grid item>
          <Typography variant="body1" className={classes.postCountContainer}>
            총 <strong>100</strong>개 중 <strong>100</strong>개
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">이벤트 시작일</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">서버</TableCell>
              <TableCell align="center">이벤트 코드</TableCell>
              <TableCell align="center">이벤트 타이틀</TableCell>
              <TableCell align="center">예상 인원</TableCell>
              <TableCell align="center">등록 회원 수</TableCell>
              <TableCell align="center">동기화</TableCell>
              <TableCell align="center">스케줄</TableCell>
              <TableCell align="center">스케줄</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {/* {!isLoading ? (
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
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="center">
        <Grid item>
          <Pagination
            // disabled={isLoading || !pagination}
            color="primary"
            count={100}
            page={1}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default EventList;
