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

type OperatorRowProps = {
  operator: OperatorVO;
};

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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function OperatorRow({ operator }: OperatorRowProps) {
  const classes = useRowStyles();

  const [open, setOpen] = useState(false);

  const handleOpenCollapse = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleOpenCollapse}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {operator.ID}
        </TableCell>
        <TableCell align="right">{operator.STATUS}</TableCell>
        <TableCell align="right">{operator.USER_ID}</TableCell>
        <TableCell align="right">{operator.NAME}</TableCell>
        <TableCell align="right">
          {operator.PREFERENCE_ROLE ? 'O' : 'X'}
        </TableCell>
        <TableCell align="right">{operator.USER_ROLE ? 'O' : 'X'}</TableCell>
        <TableCell align="right">{operator.EVENT_ROLE ? 'O' : 'X'}</TableCell>
        <TableCell align="right">{operator.SPECIAL_ROLE ? 'O' : 'X'}</TableCell>
        <TableCell align="right">{operator.LOG_COUNT}</TableCell>
        <TableCell align="right">{operator.DATE_OF_CREATED}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                상세정보
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {new Array(4).fill(0).map((item, index) => (
                      <TableCell key={index} component="th" scope="row">
                        상세 정보 {index}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

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
                .map((user) => <OperatorRow key={user.ID} operator={user} />)
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
