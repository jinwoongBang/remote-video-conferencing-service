/**
 * React
 */
import React, { useState } from 'react';

/**
 * MUI
 */
import { Grid, Paper, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

/**
 * Library
 */
import { ko } from 'date-fns/locale';

/**
 * Default Function
 */
function SearchForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Grid container>
      <Grid item xs={12} component={Paper}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}

export default SearchForm;
