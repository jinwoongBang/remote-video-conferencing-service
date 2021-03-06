/**
 * React
 */
import React, { useCallback, useState } from 'react';

/**
 * Recoil
 */
import { useRecoilCallback, useSetRecoilState } from 'recoil';

/**
 * MUI
 */
import {
  Button,
  Grid,
  Paper,
  Switch,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  ButtonGroup,
} from '@material-ui/core';
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
import { useForm } from 'react-hook-form';

/**
 * enum
 */
import EventStatus from 'src/common/enum/event';

/**
 * Store
 */
import { eventListSearchConditionState } from 'src/store/event';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '30px 20px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',

    // marginBottom: '10px',
    '& > p': {
      fontWeight: 'bold',
    },
  },
  eventStartDateInput: {
    '& > *:not(:first-child)': {
      marginLeft: '20px',
    },
  },
}));

enum FormKey {
  FROM_DATE = 'fromDate',
  TO_DATE = 'toDate',
  STATUS = 'status',
  CODE = 'code',
  TITLE = 'title',
}

const DEFAULT_VALUE = {
  [FormKey.FROM_DATE]: '',
  [FormKey.TO_DATE]: '',
  [FormKey.STATUS]: EventStatus.ALL,
  [FormKey.CODE]: '',
  [FormKey.TITLE]: '',
};

/**
 * Default Function
 */
function SearchForm() {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const setSearchCondition = useSetRecoilState(eventListSearchConditionState);

  const [isUsedEventStartDate, setIsUsedEventStartDate] = useState(false);

  const handleChangeUsedEventStartDate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      setIsUsedEventStartDate(checked);
    },
    [],
  );

  const onSubmit = useRecoilCallback(
    ({ set }) =>
      async ({
        fromDate,
        toDate,
        status,
        code,
        title,
      }: Partial<typeof DEFAULT_VALUE>) => {
        setSearchCondition((state) => ({
          ...state,
          fromDate: isUsedEventStartDate ? fromDate : '',
          toDate: isUsedEventStartDate ? toDate : '',
          status,
          code,
          title,
        }));
      },
  );

  return (
    <Grid container component={Paper} className={classes.root}>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          spacing={3}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={2} className={classes.label}>
            <Typography variant="body1">????????? ?????????</Typography>
            <Switch
              color="primary"
              checked={isUsedEventStartDate}
              onChange={handleChangeUsedEventStartDate}
            />
          </Grid>
          <Grid item xs={5}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
              <Grid
                container
                alignItems="center"
                className={classes.eventStartDateInput}
              >
                <TextField
                  id="date"
                  // label="Birthday"
                  type="date"
                  disabled={!isUsedEventStartDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register(FormKey.FROM_DATE)}
                />
                <Typography>~</Typography>
                <TextField
                  id="date"
                  // label="Birthday"
                  type="date"
                  disabled={!isUsedEventStartDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register(FormKey.TO_DATE)}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={1} className={classes.label}>
            <Typography variant="body1">??????</Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={EventStatus.ALL}
              {...register(FormKey.STATUS)}
            >
              <MenuItem value={EventStatus.ALL}>??????</MenuItem>
              <MenuItem value={EventStatus.STOP}>??????</MenuItem>
              <MenuItem value={EventStatus.WAITING}>??????</MenuItem>
              <MenuItem value={EventStatus.PROGRESS}>??????</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={1} className={classes.label}>
            <Typography variant="body1">????????? ??????</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              placeholder="????????? ????????? ??????????????????"
              {...register(FormKey.CODE)}
            />
          </Grid>

          <Grid item xs={1} className={classes.label}>
            <Typography variant="body1">????????? ??????</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              placeholder="????????? ????????? ??????????????????"
              {...register(FormKey.TITLE)}
            />
          </Grid>

          <Grid item xs={2}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              ??????
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="outlined">
              ?????????
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchForm;
