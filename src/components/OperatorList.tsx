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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

function OperatorListTable() {
  const classes = useStyles();
  const [userListLoadable, reloadUserList] = useRecoilStateLoadable<User[]>(
    getOperatorListSelector,
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {userListLoadable.state === 'hasValue' &&
          userListLoadable
            .getValue()
            .map((user) => <div key={user.ID}>{user.NAME}</div>)}
      </Paper>
    </div>
  );
}

export default OperatorListTable;
