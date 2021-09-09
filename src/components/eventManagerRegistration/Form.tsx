/**
 * React
 */
import React from 'react';

/**
 * Recoil
 */
import { useRecoilCallback } from 'recoil';

/**
 * Libarary
 */
import { useForm } from 'react-hook-form';
import * as _ from 'lodash';

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
  MenuItem,
  Select,
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
  Event,
  PermIdentity,
  Lock,
  EnhancedEncryption,
  Phone,
} from '@material-ui/icons';

/**
 * Components
 */
import PhoneNumberMask from 'src/components/maskInput/PhoneNumber';

/**
 * VO
 */
import EventVO from 'src/vo/EventVO';
import OperatorVO from 'src/vo/OperatorVO';

/**
 *  Commons
 */
import HttpClient from 'src/common/framework/HttpClient';
import { forcedReloadEventManagerListState } from 'src/store/eventManager';
import EventManagerVO from 'src/vo/EventManagerVO';

type FormProps = {
  eventList: EventVO[];
};

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
  modifyButton: {
    width: '200px',
  },
  divider: {
    padding: '15px',
  },
}));

enum FormKey {
  EVENT_ID = 'EVENT_ID',
  USER_ID = 'USER_ID',
  NAME = 'NAME',
  PASSWORD = 'PASSWORD',
  PASSWORD_CONFIRM = 'PASSWORD_CONFIRM',
  PHONE_NUMBER = 'PHONE_NUMBER',
  EMAIL = 'EMAIL',
}

const DEFAULT_VALUE = {
  [FormKey.EVENT_ID]: -1,
  [FormKey.USER_ID]: '',
  [FormKey.NAME]: '',
  [FormKey.PASSWORD]: '',
  [FormKey.PASSWORD_CONFIRM]: '',
  [FormKey.PHONE_NUMBER]: '',
  [FormKey.EMAIL]: '',
};

function Form({ eventList }: FormProps) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const onSubmit = useRecoilCallback(
    ({ set }) =>
      async (data: Partial<typeof DEFAULT_VALUE>) => {
        try {
          const formData = _.cloneDeep(data);
          delete formData.PASSWORD_CONFIRM;

          const user = Object.assign(new EventManagerVO(), formData);
          user.TYPE = 1;
          const response = await HttpClient.post('/operator', { user });
        } catch (error) {
          console.error(error);
        } finally {
          reset(DEFAULT_VALUE);
          set(forcedReloadEventManagerListState, (state) => state + 1);
        }
      },
  );

  return (
    <Grid
      container
      alignItems="center"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<Event />}
        >
          이벤트
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <Select
          fullWidth
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={-1}
          {...register(FormKey.EVENT_ID)}
        >
          <MenuItem value={-1}>선택 안함</MenuItem>
          {eventList.map((event: EventVO) => (
            <MenuItem key={event.ID} value={event.ID}>
              {event.TITLE}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<PermIdentity />}
        >
          아이디
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="아이디를 입력해주세요."
          {...register(FormKey.USER_ID)}
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<Person />}
        >
          이름
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="이름을 입력해주세요."
          {...register(FormKey.NAME)}
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<Lock />}
        >
          비밀번호
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="비밀번호를 입력해주세요."
          {...register(FormKey.PASSWORD)}
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<EnhancedEncryption />}
        >
          비밀번호 확인
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          {...register(FormKey.PASSWORD_CONFIRM)}
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<Phone />}
        >
          핸드폰
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="핸드폰 번호를 입력해주세요."
          InputProps={{
            inputComponent: PhoneNumberMask as any,
          }}
          {...register(FormKey.PHONE_NUMBER)}
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<Mail />}
        >
          이메일
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="이메일을 입력해주세요."
          {...register(FormKey.EMAIL)}
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
  );
}

export default Form;
