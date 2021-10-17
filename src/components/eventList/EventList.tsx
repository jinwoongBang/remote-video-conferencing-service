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
  Button,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  RadioButtonUnchecked,
} from '@material-ui/icons';

/**
 * Store
 */

import {
  eventListPaginationState,
  getEventListSelector,
  GetEventListSelectorType,
} from 'src/store/event';

/**
 * VO
 */
import { PreferenceVO } from 'src/vo';
import EventVO from 'src/vo/EventVO';

/**
 * Components
 */
import Loading from 'src/components/Loading';
import EventItem from './EventItem';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  postCountContainer: {
    margin: '30px 0 0 0',
    '& > p strong': {
      fontWeight: 'bold',
      fontSize: '1.2em',
      margin: '0 2px',
    },
  },
  paper: {
    // width: '100%',
    height: 'calc(100vh - 260px)',
    marginBottom: theme.spacing(2),
    // border: '1px solid tomato',
  },
  paginationInfoContainer: {
    margin: '30px 0 0 0',
  },
  tbody: {
    // width: '100%',
  },
}));

type EventListProps = {
  eventOptionList: PreferenceVO[];
};

function EventList({ eventOptionList }: EventListProps) {
  const classes = useStyles();

  const [page, setPage] = useRecoilState(eventListPaginationState);

  const eventListLoadable = useRecoilValueLoadable<GetEventListSelectorType>(
    getEventListSelector({
      page: page.pageNumber,
      returnCount: page.returnCount,
    }),
  );

  const isLoading = useMemo(() => {
    const { state } = eventListLoadable;
    return state !== 'hasError' && state === 'loading';
  }, [eventListLoadable.state]);

  const pagination = useMemo(() => {
    const { state } = eventListLoadable;
    return state === 'hasValue'
      ? eventListLoadable.getValue().pagination
      : undefined;
  }, [eventListLoadable.state]);

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
      >
        <Grid item className={classes.postCountContainer}>
          <Typography variant="body1">
            총 <strong>{pagination?.itemCount || 0}</strong>개 중{' '}
            <strong>
              {!isLoading ? eventListLoadable.getValue().eventList.length : 0}
            </strong>
            개
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={50}></TableCell>
              <TableCell align="center" width={100}>
                ID
              </TableCell>
              <TableCell align="center" width={100}>
                이벤트 시작일
              </TableCell>
              <TableCell align="center" width={100}>
                상태
              </TableCell>
              <TableCell align="center" width={100}>
                서버
              </TableCell>
              <TableCell align="center" width={100}>
                이벤트 코드
              </TableCell>
              <TableCell align="center" width={150}>
                이벤트 타이틀
              </TableCell>
              <TableCell align="center" width={100}>
                예상 인원
              </TableCell>
              <TableCell align="center" width={100}>
                등록 회원 수
              </TableCell>
              <TableCell align="center"></TableCell>
              {/* <TableCell align="center" width={100}>
                동기화
              </TableCell> */}
              {/* {eventOptionList.map((item) => {
                return (
                  <TableCell
                    key={item.PREFERENCE_KEY}
                    align="center"
                    width={100}
                  >
                    {item.NAME}
                  </TableCell>
                );
              })} */}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {!isLoading ? (
              eventListLoadable
                .getValue()
                .eventList.map((event: EventVO) => (
                  <EventItem
                    key={event.ID}
                    event={event}
                    eventOptionList={eventOptionList}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>
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

export default EventList;
