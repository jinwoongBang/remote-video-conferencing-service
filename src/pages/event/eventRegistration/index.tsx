/**
 * React
 */
import React, { useEffect, useMemo } from 'react';

/**
 * Next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

/**
 * Recoil
 */
import { useRecoilCallback } from 'recoil';

/**
 * Libarary
 */
import { useForm } from 'react-hook-form';
import * as _ from 'lodash';
import clsx from 'clsx';
import { ko } from 'date-fns/locale';

/**
 *  Material UI
 */
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Cancel,
  Copyright,
  Create,
  HowToReg,
  Mail,
  Person,
  PhoneAndroid,
  SecurityRounded,
  SecuritySharp,
  VpnKey,
  VerifiedUser,
} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

/**
 * Components
 */
import AppLayout from 'src/components/AppLayout';
import EventOptionSwitch from 'src/components/eventRegistration/EventOptionSwitch';

/**
 * Enum
 */
import EventStatus from 'src/common/enum/event';

/**
 * Service
 */
import ServerService from 'src/service/ServerService';
import PreferenceService from 'src/service/PreferenceService';

/**
 * VO
 */
import ServerVO from 'src/vo/ServerVO';
import { PreferenceVO } from 'src/vo';

const useStyles = makeStyles((theme: Theme) => ({
  inputLabelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px',
  },
  inputContainer: {
    padding: '15px',
  },
  buttonContaier: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px',
    gap: '10px',
  },
  eventCodeContainer: {
    '&': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& > *:first-child': {
      width: '70%',
    },
    '& > *:not(:first-child)': {
      width: '25%',
      marginLeft: '5px',
    },
  },
  modifyButton: {
    width: '200px',
  },
  divider: {
    padding: '15px',
  },
}));

type EventOption = {
  key: string;
  isUsed: boolean;
};

export enum FormKey {
  SERVER_ID = 'SERVER_ID',
  NUMBER_OF_PEOPLE = 'NUMBER_OF_PEOPLE',
  CODE = 'CODE',
  STATUS = 'STATUS',
  TITLE = 'TITLE',
  DATE_OF_START = 'DATE_OF_START',
  ID_TEXT = 'ID_TEXT',
  PASSWORD_TEXT = 'PASSWORD_TEXT',
  JOB_TEXT = 'JOB_TEXT',
  BELONG_TO_TEXT = 'BELONG_TO_TEXT',
  LICENSE_NUMBER_TEXT = 'LICENSE_NUMBER_TEXT',
  SPECIALIST_NUMBER_TEXT = 'SPECIALIST_NUMBER_TEXT',
  SOCIETY_REQUEST_TEXT = 'SOCIETY_REQUEST_TEXT',
  LOGIN_NOTICE = 'LOGIN_NOTICE',
  PRE_REGISTRATION_TEXT = 'PRE_REGISTRATION_TEXT',
  OPTION_LIST = 'OPTION_LIST',
}

function createEventOptionDefaultValue(eventOptionList: PreferenceVO[]) {
  const result: {
    [key: string]: boolean;
  } = {};

  eventOptionList.forEach((eventOption) => {
    result[eventOption.PREFERENCE_KEY] = false;
  });

  return result;
}

function EventRegistration({
  serverList,
  eventOptionList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  const defaultFormValue = useMemo(() => {
    return {
      [FormKey.SERVER_ID]: -1,
      [FormKey.NUMBER_OF_PEOPLE]: 0,
      [FormKey.CODE]: '',
      [FormKey.STATUS]: EventStatus.WAITING,
      [FormKey.TITLE]: '',
      [FormKey.DATE_OF_START]: null,
      [FormKey.ID_TEXT]: '',
      [FormKey.PASSWORD_TEXT]: '',
      [FormKey.JOB_TEXT]: '',
      [FormKey.BELONG_TO_TEXT]: '',
      [FormKey.LICENSE_NUMBER_TEXT]: '',
      [FormKey.SPECIALIST_NUMBER_TEXT]: '',
      [FormKey.SOCIETY_REQUEST_TEXT]: '',
      [FormKey.LOGIN_NOTICE]: '',
      [FormKey.PRE_REGISTRATION_TEXT]: '',
      [FormKey.OPTION_LIST]: createEventOptionDefaultValue(eventOptionList),
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValue,
  });

  const onSubmit = useRecoilCallback(
    ({ set }) =>
      async (data: Partial<typeof defaultFormValue>) => {
        try {
          const formData = _.cloneDeep(data);
          console.log({ formData });
          // const response = await HttpClient.post('/operator', { user });
        } catch (error) {
          console.error(error);
        } finally {
          reset(defaultFormValue);
          // set(forcedReloadEventManagerListState, (state) => state + 1);
        }
      },
  );

  return (
    <AppLayout>
      <Grid container component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={2} className={classes.inputLabelContainer}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            서버 위치
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <Select
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={-1}
            {...register(FormKey.SERVER_ID)}
          >
            <MenuItem value={-1}>선택 안함</MenuItem>
            {serverList.map((server: ServerVO) => (
              <MenuItem key={server.ID} value={server.ID}>
                {server.NAME}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={2} className={classes.inputLabelContainer}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            예상 인원
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="예상 인원을 입력해주세요."
            type="number"
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">명</InputAdornment>
              ),
            }}
            {...register(FormKey.NUMBER_OF_PEOPLE)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            이벤트 코드
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          className={clsx(classes.inputContainer, classes.eventCodeContainer)}
        >
          <TextField
            id="standard-required"
            placeholder="이벤트 코드를 입력해주세요."
            {...register(FormKey.CODE)}
          />
          <Button variant="contained" color="primary">
            중복 체크
          </Button>
        </Grid>

        <Grid item xs={2} className={classes.inputLabelContainer}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            이벤트 상태
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <Select
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={-1}
            {...register(FormKey.STATUS)}
          >
            <MenuItem value={EventStatus.STOP}>중지</MenuItem>
            <MenuItem value={EventStatus.WAITING}>대기</MenuItem>
            <MenuItem value={EventStatus.PROGRESS}>진행</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            이벤트 타이틀
          </Button>
        </Grid>
        <Grid item xs={4} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="이벤트 타이틀을 입력해주세요."
            {...register(FormKey.TITLE)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            이벤트 시작일
          </Button>
        </Grid>
        <Grid item xs={4} className={clsx(classes.inputContainer)}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
            <Grid container justifyContent="space-around">
              <TextField
                fullWidth
                id="date"
                // label="Birthday"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register(FormKey.DATE_OF_START)}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            이벤트 옵션
          </Button>
        </Grid>
        <Grid item xs={10} className={clsx(classes.inputContainer)}>
          <Grid container>
            {eventOptionList.map((eventOption) => (
              <EventOptionSwitch
                key={eventOption.ID}
                formRegister={register}
                eventOption={eventOption}
              />
            ))}
          </Grid>
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            아이디 문구
          </Button>
        </Grid>
        <Grid item xs={4} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="아이디 문구를 입력해주세요."
            {...register(FormKey.ID_TEXT)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            비밀번호 문구
          </Button>
        </Grid>
        <Grid item xs={4} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="비밀번호 문구를 입력해주세요."
            {...register(FormKey.PASSWORD_TEXT)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            작업 문구
          </Button>
        </Grid>
        <Grid item xs={4} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="작업 문구를 입력해주세요."
            {...register(FormKey.JOB_TEXT)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            소속 문구
          </Button>
        </Grid>
        <Grid item xs={4} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="소속 문구를 입력해주세요."
            {...register(FormKey.BELONG_TO_TEXT)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            면허번호 문구
          </Button>
        </Grid>
        <Grid item xs={4} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="면허번호 문구를 입력해주세요."
            {...register(FormKey.LICENSE_NUMBER_TEXT)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            전문의번호 문구
          </Button>
        </Grid>
        <Grid item xs={4} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="전문의번호 문구를 입력해주세요."
            {...register(FormKey.SPECIALIST_NUMBER_TEXT)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            학회요청사항 문구
          </Button>
        </Grid>
        <Grid item xs={10} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="학회요청사항 문구를 입력해주세요."
            {...register(FormKey.SOCIETY_REQUEST_TEXT)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            로그인 공지정보
          </Button>
        </Grid>
        <Grid item xs={10} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={5}
            placeholder="로그인 공지정보를 입력해주세요."
            variant="outlined"
            {...register(FormKey.LOGIN_NOTICE)}
          />
        </Grid>

        <Grid item xs={2} className={clsx(classes.inputLabelContainer)}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            사전등록 완료 표시 문구
          </Button>
        </Grid>
        <Grid item xs={10} className={clsx(classes.inputContainer)}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={5}
            placeholder="사전등록 완료 시 표시 문구를 입력해주세요."
            variant="outlined"
            {...register(FormKey.PRE_REGISTRATION_TEXT)}
          />
        </Grid>

        <Grid item xs={12} className={classes.divider}>
          <Divider />
        </Grid>
        <Grid item xs={12} className={classes.buttonContaier}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            className={classes.modifyButton}
            startIcon={<Cancel />}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.modifyButton}
            startIcon={<Create />}
            type="submit"
          >
            등록
          </Button>
        </Grid>
      </Grid>
    </AppLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{
  serverList: ServerVO[];
  eventOptionList: PreferenceVO[];
}> = async ({ params }) => {
  const serverList = await ServerService.selectAllServerList();
  const eventOptionList =
    await PreferenceService.selectPreferenceListByGroupKey({
      preferenceKey: 'EVENT_OPTIONS',
    });
  return {
    props: {
      serverList,
      eventOptionList,
    },
  };
};

export default EventRegistration;
