/**
 * React
 */
import React, { useState } from 'react';

/**
 * MUI
 */
import { Button, Grid, Paper, Switch, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';

/**
 * Library
 */
import { ko } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '20px',
  },
  eventStartDateLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  eventStartDateInput: {
    // '& > *:not(:first-child)': {
    //   marginLeft: '10px',
    // },
  },
}));

/**
 * Default Function
 */
function SearchForm() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Grid container component={Paper} className={classes.root}>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={2} className={classes.eventStartDateLabel}>
            <Typography variant="body1">이벤트 시작일</Typography>
            <Switch color="primary" />
          </Grid>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
              <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                className={classes.eventStartDateInput}
              >
                <DatePicker
                  // label="이벤트 시작일"
                  format="yyyy/MM/dd"
                  value={selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling
                />
                <Typography>~</Typography>
                <DatePicker
                  // label="이벤트 종료일"
                  format="yyyy/MM/dd"
                  value={selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchForm;
