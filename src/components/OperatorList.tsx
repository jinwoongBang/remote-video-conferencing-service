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

import { Paper } from '@material-ui/core';
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
    // description: 'This column has a value getter and is not sortable.',
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
    width: 90,
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
      <Paper className={classes.paper}>
        {userListLoadable.state === 'hasValue' && (
          <DataGrid
            rows={userListLoadable.getValue().map((operator) => ({
              id: operator.ID,
              ...operator,
            }))}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        )}
      </Paper>
    </div>
  );
}

export default OperatorListTable;
