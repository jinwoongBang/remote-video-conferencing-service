/**
 * React
 */
import React, { useState, useCallback } from 'react';

/**
 * Recoil
 */
import { useRecoilCallback, useRecoilValue } from 'recoil';

/**
 * MUI
 */
import {
  DialogContent,
  DialogContentText,
  Grid,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  SwitchProps,
  SwitchClassKey,
  FormControlLabel,
  Checkbox,
  FormGroup,
  DialogActions,
} from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core';
import {
  EnhancedEncryption,
  HowToReg,
  Lock,
  Mail,
  PermIdentity,
  Person,
  Phone,
  VerifiedUser,
} from '@material-ui/icons';

/**
 * Libarary
 */
import { useForm, Controller } from 'react-hook-form';

/**
 * VO
 */
import OperatorVO from 'src/vo/OperatorVO';
import { AuthorityVO } from 'src/vo';

/**
 * Components
 */
import PhoneNumberMask from 'src/components/maskInput/PhoneNumber';

/**
 * common
 */
import HttpClient from 'src/common/framework/HttpClient';

/**
 * store
 */
import { authorityState } from 'src/store/authority';
import { forcedReloadEventManagerListState } from 'src/store/eventManager';
import EventManagerVO from 'src/vo/EventManagerVO';

function createAuthoritiesParam() {
  return '';
}

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }),
)(Switch);

const useStyles = makeStyles((theme: Theme) => ({
  inputLabelContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px',
  },
  inputContainer: {
    padding: '15px',
  },
}));

type ModifyFormProps = {
  eventManager: EventManagerVO;
  onOpen: () => void;
};

enum FormKey {
  STATUS = 'STATUS',
  EVENT_ID = 'EVENT_ID',
  USER_ID = 'USER_ID',
  NAME = 'NAME',
  PASSWORD = 'PASSWORD',
  PASSWORD_CONFIRM = 'PASSWORD_CONFIRM',
  PHONE_NUMBER = 'PHONE_NUMBER',
  EMAIL = 'EMAIL',
}

function ModifyForm({ eventManager, onOpen }: ModifyFormProps) {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [FormKey.STATUS]: eventManager.STATUS === 1,
      [FormKey.EVENT_ID]: eventManager.EVENT_ID,
      [FormKey.USER_ID]: eventManager.USER_ID,
      [FormKey.NAME]: eventManager.NAME,
      [FormKey.PASSWORD]: eventManager.PASSWORD,
      [FormKey.PASSWORD_CONFIRM]: eventManager.PASSWORD,
      [FormKey.PHONE_NUMBER]: eventManager.PHONE_NUMBER,
      [FormKey.EMAIL]: eventManager.EMAIL,
    },
  });

  const onSubmit = useRecoilCallback(
    ({ set }) =>
      async (data: Partial<EventManagerVO>) => {
        try {
          const user = new EventManagerVO();
          user.ID = eventManager.ID;
          user.STATUS = data.STATUS ? 1 : 0;
          user.NAME = data.NAME;
          user.PASSWORD = data.PASSWORD;
          user.PHONE_NUMBER = data.PHONE_NUMBER;
          user.EMAIL = data.EMAIL;

          await HttpClient.put('/operator', {
            user,
          });
        } catch (error) {
          console.error(error);
        } finally {
          onOpen();
          set(forcedReloadEventManagerListState, (state) => state + 1);
        }
      },
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Grid container alignItems="center">
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<HowToReg />}
              disableRipple
            >
              상태
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>비활성</Grid>
                <Grid item>
                  <Controller
                    name={FormKey.STATUS}
                    control={control}
                    defaultValue={false}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <AntSwitch
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item>활성</Grid>
              </Grid>
            </Typography>
          </Grid>
          {/*  */}
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<HowToReg />}
              disableRipple
            >
              이벤트 (이벤트 코드)
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <Typography variant="body1">
              {`${eventManager.EVENT_TITLE} (${eventManager.EVENT_CODE})`}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<PermIdentity />}
              disableRipple
            >
              아이디
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <Typography variant="body1">{eventManager.USER_ID}</Typography>
          </Grid>
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Person />}
              disableRipple
            >
              이름
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="운영자 이름 입력해주세요."
              {...register(FormKey.NAME)}
            />
          </Grid>
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Lock />}
              disableRipple
            >
              비밀번호
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="비밀번호를 입력해주세요."
              {...register(FormKey.PASSWORD)}
            />
          </Grid>
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<EnhancedEncryption />}
              disableRipple
            >
              비밀번호 확인
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="비밀번호를 입력해주세요."
              {...register(FormKey.PASSWORD_CONFIRM)}
            />
          </Grid>
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Phone />}
              disableRipple
            >
              핸드폰
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <TextField
              fullWidth
              placeholder="휴대전화 번호를 입력해주세요."
              InputProps={{
                inputComponent: PhoneNumberMask as any,
              }}
              {...register(FormKey.PHONE_NUMBER)}
            />
          </Grid>
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Mail />}
              disableRipple
            >
              이메일
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="이메일을 입력해주세요."
              {...register(FormKey.EMAIL)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOpen} color="secondary" variant="outlined">
          취소
        </Button>
        <Button type="submit" color="primary" variant="outlined" autoFocus>
          확인
        </Button>
      </DialogActions>
    </form>
  );
}
export default ModifyForm;
