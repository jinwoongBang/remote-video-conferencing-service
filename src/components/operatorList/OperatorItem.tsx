import React, { useCallback, useState, useEffect } from 'react';
/**
 * Recoil
 */
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilCallback,
} from 'recoil';

/**
 * Library
 */
import clsx from 'clsx';
import { AxiosResponse } from 'axios';

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
  Chip,
  Divider,
  DialogContentText,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';

import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Check,
  Close,
  Edit,
  Delete,
  Person,
} from '@material-ui/icons';

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@material-ui/data-grid';

/**
 * Store
 */
import {
  forcedReloadOperatorListState,
  getOperatorListSelector,
  operatorListPaginationState,
} from 'src/store/operator';
import { User } from 'src/vo';
import OperatorVO from 'src/vo/OperatorVO';

/**
 * Components
 */
import Loading from 'src/components/Loading';
import Modal from 'src/components/modal/Modal';

/**
 *  Framework
 */
import HttpClient from 'src/common/framework/HttpClient';
import ModifyForm from 'src/components/operatorList/ModifyForm';

type OperatorItemProps = {
  operator: OperatorVO;
};
type UserStatusProps = {
  status?: number;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  box: {
    background: 'rgb(241, 241, 241)',
  },
  chip: {
    width: '100%',
  },
  collapseContainer: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  detailContentsContainer: {
    display: 'flex',
    '& > *:not(:last-child)': {
      marginRight: '10px',
    },
  },
}));

function UserStatus({ status }: UserStatusProps) {
  return status === 1 ? (
    <Typography variant="caption" color="primary">
      ??????
    </Typography>
  ) : (
    <Typography variant="caption" color="secondary">
      ?????????
    </Typography>
  );
}

function OperatorItem({ operator }: OperatorItemProps) {
  const classes = useStyles();

  const [detailOpen, setDetailOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleOpenCollapse = useCallback(() => {
    setDetailOpen((state) => !state);
  }, []);

  const handleOpenModifyModal = useCallback(() => {
    setModifyModalOpen((state) => !state);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setDeleteModalOpen((state) => !state);
  }, []);

  const handleSubmitDeleteOperator = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          await HttpClient.delete('/operator', {
            params: { id: operator.ID },
          });
        } catch (error) {
          console.error(error);
        } finally {
          setDeleteModalOpen(false);
          set(forcedReloadOperatorListState, (state) => state + 1);
        }
      },
  );

  return (
    <>
      <TableRow className={classes.root} hover>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleOpenCollapse}
          >
            {detailOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {operator.ID}
        </TableCell>
        <TableCell align="center">
          <UserStatus status={operator?.STATUS} />
        </TableCell>
        <TableCell align="center">{operator.USER_ID || '-'}</TableCell>
        <TableCell align="center">{operator.NAME || '-'}</TableCell>
        <TableCell align="center">
          {operator.PREFERENCE_ROLE ? (
            <Check color="primary" />
          ) : (
            <Close color="secondary" />
          )}
        </TableCell>
        <TableCell align="center">
          {operator.USER_ROLE ? (
            <Check color="primary" />
          ) : (
            <Close color="secondary" />
          )}
        </TableCell>
        <TableCell align="center">
          {operator.EVENT_ROLE ? (
            <Check color="primary" />
          ) : (
            <Close color="secondary" />
          )}
        </TableCell>
        <TableCell align="center">
          {operator.SPECIAL_ROLE ? (
            <Check color="primary" />
          ) : (
            <Close color="secondary" />
          )}
        </TableCell>
        <TableCell align="center">{operator.LOG_COUNT}</TableCell>
        <TableCell align="center">{operator.dateOfCreated}</TableCell>
      </TableRow>
      <TableRow className={classes.box}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={11}
          className={classes.collapseContainer}
        >
          <Collapse in={detailOpen} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container alignItems="center" spacing={4}>
                <Grid item xs={2}>
                  <Chip
                    className={classes.chip}
                    label="??????"
                    // color="primary"
                    variant="default"
                  />
                </Grid>
                <Grid item xs={9} className={classes.detailContentsContainer}>
                  <UserStatus status={operator?.STATUS} />
                  <Typography variant="caption">
                    [ ??? : {operator.LOG_COUNT} ???, ?????? ????????? ?????? :{' '}
                    {operator.dateOfCreated} ]
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={4}>
                <Grid item xs={2}>
                  <Chip
                    className={classes.chip}
                    label="????????? ??????"
                    variant="default"
                  />
                </Grid>
                <Grid item xs={4} className={classes.detailContentsContainer}>
                  <Typography variant="body1">{operator.NAME}</Typography>
                  <Typography variant="caption">
                    ( ID : {operator.USER_ID} )
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Chip
                    className={classes.chip}
                    label="????????????"
                    variant="default"
                  />
                </Grid>
                <Grid item xs={4} className={classes.detailContentsContainer}>
                  <Typography variant="body1">{operator.PASSWORD}</Typography>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={4}>
                <Grid item xs={2}>
                  <Chip
                    className={classes.chip}
                    label="?????????"
                    variant="default"
                  />
                </Grid>
                <Grid item xs={4} className={classes.detailContentsContainer}>
                  <Typography variant="body1">
                    {operator.PHONE_NUMBER || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Chip
                    className={classes.chip}
                    label="?????????"
                    variant="default"
                  />
                </Grid>
                <Grid item xs={4} className={classes.detailContentsContainer}>
                  <Typography variant="body1">
                    {operator.EMAIL || '-'}
                  </Typography>
                </Grid>
              </Grid>
              {/* <Divider /> */}
              <Grid container justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    startIcon={<Edit />}
                    onClick={handleOpenModifyModal}
                  >
                    ??????
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    startIcon={<Delete />}
                    onClick={handleOpenDeleteModal}
                  >
                    ??????
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Modal
        open={modifyModalOpen}
        onOpen={handleOpenModifyModal}
        title="????????? ?????? ??????"
        maxWidth="md"
      >
        <ModifyForm operator={operator} onOpen={handleOpenModifyModal} />
      </Modal>

      <Modal
        open={deleteModalOpen}
        onOpen={handleOpenDeleteModal}
        title="????????? ?????? ??????"
        maxWidth="xs"
      >
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            ????????? ?????????????????????????
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOpenDeleteModal}
            color="secondary"
            variant="outlined"
          >
            ??????
          </Button>
          <Button
            onClick={handleSubmitDeleteOperator}
            color="primary"
            variant="outlined"
            autoFocus
          >
            ??????
          </Button>
        </DialogActions>
      </Modal>
    </>
  );
}

export default OperatorItem;
