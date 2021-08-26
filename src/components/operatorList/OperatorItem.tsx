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
  Button,
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

type OperatorItemProps = {
  operator: OperatorVO;
};

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function OperatorItem({ operator }: OperatorItemProps) {
  const classes = useRowStyles();

  const [open, setOpen] = useState(false);

  const handleOpenCollapse = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  return (
    <>
      <TableRow className={classes.root} hover>
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
        <TableCell align="right">
          {operator.STATUS === 1 ? '활성' : '비활성'}
        </TableCell>
        <TableCell align="right">{operator.USER_ID}</TableCell>
        <TableCell align="right">{operator.NAME}</TableCell>
        <TableCell align="right">
          {operator.PREFERENCE_ROLE ? 'O' : 'X'}
        </TableCell>
        <TableCell align="right">{operator.USER_ROLE ? 'O' : 'X'}</TableCell>
        <TableCell align="right">{operator.EVENT_ROLE ? 'O' : 'X'}</TableCell>
        <TableCell align="right">{operator.SPECIAL_ROLE ? 'O' : 'X'}</TableCell>
        <TableCell align="right">{operator.LOG_COUNT}</TableCell>
        <TableCell align="right">{operator.dateOfCreated}</TableCell>
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
                  <TableRow>
                    <Button>수정</Button>
                    <Button>삭제</Button>
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

export default OperatorItem;
