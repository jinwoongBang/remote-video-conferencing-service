import React, { useCallback, useState } from 'react';

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
  Chip,
  Divider,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  RadioButtonUnchecked,
} from '@material-ui/icons';
import EventVO from 'src/vo/EventVO';
import { PreferenceVO } from 'src/vo';

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    background: 'rgb(241, 241, 241)',
  },
  subRow: { paddingBottom: 0, paddingTop: 0 },
  authorityItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorityChip: {
    width: '90%',
    marginBottom: '10px',
  },
  divider: {
    margin: '20px 0',
  },
}));

type EventItemProps = {
  event: EventVO;
  eventOptionList: PreferenceVO[];
};
function EventItem({ event, eventOptionList }: EventItemProps) {
  const classes = useStyles();
  const [detailOpen, setDetailOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenCollapse = useCallback(() => {
    setDetailOpen((state) => !state);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableRow hover key={event.ID}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleOpenCollapse}
          >
            {detailOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{event.ID}</TableCell>
        <TableCell align="center">{event.dateOfStart}</TableCell>
        <TableCell align="center">{event.status}</TableCell>
        <TableCell align="center">{event.SERVER_NAME}</TableCell>
        <TableCell align="center">{event.CODE}</TableCell>
        <TableCell align="center">{event.TITLE}</TableCell>
        <TableCell align="center">{event.NUMBER_OF_PEOPLE}</TableCell>
        <TableCell align="center">{event.USER_COUNT}</TableCell>
        <TableCell align="center">
          <IconButton onClick={handleClick}>
            <MoreHoriz />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </TableCell>
        {/* <TableCell align="center">-</TableCell> */}
        {/* {eventOptionList.map((option) => (
          <TableCell key={option.ID} align="center">
            {event.OPTION_LIST[option.PREFERENCE_KEY] ? (
              <RadioButtonUnchecked color="primary" />
            ) : (
              <Close color="secondary" />
            )}
          </TableCell>
        ))} */}
      </TableRow>
      <TableRow className={classes.box}>
        <TableCell className={classes.subRow} colSpan={10}>
          <Collapse in={detailOpen} timeout="auto" unmountOnExit>
            <Box margin={3}>
              <Grid container spacing={3}>
                {eventOptionList.map((option) => (
                  <Grid
                    item
                    xs={2}
                    key={option.ID}
                    className={classes.authorityItem}
                  >
                    <Chip
                      label={option.NAME}
                      className={classes.authorityChip}
                    />
                    {event.OPTION_LIST[option.PREFERENCE_KEY] ? (
                      <RadioButtonUnchecked color="primary" />
                    ) : (
                      <Close color="secondary" />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default React.memo(
  EventItem,
  (prevProps, currentProps) => prevProps.event === currentProps.event,
);
