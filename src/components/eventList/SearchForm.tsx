/**
 * React
 */
import React, { useCallback, useState } from 'react';

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

/**
 * enum
 */
import EventStatus from 'src/common/enum/event';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '30px 20px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
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

/**
 * Default Function
 */
function SearchForm() {
  const classes = useStyles();

  const [isUsedEventStartDate, setIsUsedEventStartDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeUsedEventStartDate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      setIsUsedEventStartDate(checked);
    },
    [],
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Grid container component={Paper} className={classes.root}>
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={2} className={classes.label}>
            <Typography variant="body1">이벤트 시작일</Typography>
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
                // justifyContent="space-evenly"
                alignItems="center"
                className={classes.eventStartDateInput}
              >
                <DatePicker
                  // label="이벤트 시작일"
                  format="yyyy/MM/dd"
                  value={selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling
                  disabled={!isUsedEventStartDate}
                />
                <Typography>~</Typography>
                <DatePicker
                  // label="이벤트 종료일"
                  format="yyyy/MM/dd"
                  value={selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling
                  disabled={!isUsedEventStartDate}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={1} className={classes.label}>
            <Typography variant="body1">이벤트 상태</Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={EventStatus.ALL}
              // label="이벤트 상태"
            >
              <MenuItem value={EventStatus.ALL}>전체</MenuItem>
              <MenuItem value={EventStatus.STOP}>중지</MenuItem>
              <MenuItem value={EventStatus.WAITING}>대기</MenuItem>
              <MenuItem value={EventStatus.PROGRESS}>진행</MenuItem>
            </Select>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">이벤트 상태</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={EventStatus.ALL}
                label="이벤트 상태"
              >
                <MenuItem value={EventStatus.ALL}>전체</MenuItem>
                <MenuItem value={EventStatus.STOP}>중지</MenuItem>
                <MenuItem value={EventStatus.WAITING}>대기</MenuItem>
                <MenuItem value={EventStatus.PROGRESS}>진행</MenuItem>
              </Select>
            </FormControl> */}
          </Grid>

          <Grid item xs={1} className={classes.label}>
            <Typography variant="body1">이벤트 코드</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth placeholder="이벤트 코드를 입력해주세요" />
          </Grid>

          <Grid item xs={1} className={classes.label}>
            <Typography variant="body1">이벤트 명칭</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth placeholder="이벤트 코드를 입력해주세요" />
          </Grid>

          <Grid item xs={2}>
            <Button fullWidth variant="contained" color="primary">
              검색
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="outlined">
              초기화
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchForm;
