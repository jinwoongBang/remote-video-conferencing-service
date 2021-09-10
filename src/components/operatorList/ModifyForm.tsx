/**
 * React
 */
import React, { useState, useCallback } from 'react';

/**
 * Recoil
 */
import { useRecoilCallback, useRecoilValue } from 'recoil';

/**
 * Libarary
 */
import { useForm, Controller } from 'react-hook-form';

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
import { AuthorityKeyType } from 'src/common/enum/authority';

/**
 * store
 */
import { authorityState } from 'src/store/authority';
import { forcedReloadOperatorListState } from 'src/store/operator';

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
  operator: OperatorVO;
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
  AUTHORITIES = 'AUTHORITIES',
}

type DefaultFormType = {
  STATUS: boolean;
  EVENT_ID: number;
  USER_ID: number;
  NAME: string;
  PASSWORD: string;
  PASSWORD_CONFIRM: string;
  PHONE_NUMBER: string;
  EMAIL: string;
  AUTHORITIES: {
    [key: AuthorityKeyType]: boolean;
  };
};

function ModifyForm({ operator, onOpen }: ModifyFormProps) {
  const classes = useStyles();
  const authorityList = useRecoilValue(authorityState);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [FormKey.STATUS]: operator.STATUS === 1,
      [FormKey.EVENT_ID]: operator.EVENT_ID,
      [FormKey.USER_ID]: operator.USER_ID,
      [FormKey.NAME]: operator.NAME,
      [FormKey.PASSWORD]: operator.PASSWORD,
      [FormKey.PASSWORD_CONFIRM]: operator.PASSWORD,
      [FormKey.PHONE_NUMBER]: operator.PHONE_NUMBER,
      [FormKey.EMAIL]: operator.EMAIL,
      [FormKey.AUTHORITIES]: (() => {
        const auth: {
          [key: AuthorityKeyType]: boolean;
        } = {};
        authorityList.forEach((item) => {
          auth[item.AUTHORITY_KEY as AuthorityKeyType] =
            operator[item.AUTHORITY_KEY];
        });
        return auth;
      })(),
    },
  });

  const onSubmit = useRecoilCallback(
    ({ set }) =>
      async (data: DefaultFormType) => {
        try {
          const user = new OperatorVO();
          user.ID = operator.ID;
          user.NAME = data.NAME;
          user.STATUS = data.STATUS ? 1 : 0;
          user.PASSWORD = data.PASSWORD;
          user.PHONE_NUMBER = data.PHONE_NUMBER;
          user.EMAIL = data.EMAIL;
          user.AUTHORITIES = user.createAuthorityIdList(
            authorityList,
            data.AUTHORITIES,
          );

          await HttpClient.put('/operator', {
            user,
          });
        } catch (error) {
          console.error(error);
        } finally {
          onOpen();
          set(forcedReloadOperatorListState, (state) => state + 1);
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
          <Grid item xs={10} className={classes.inputContainer}>
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
              startIcon={<PermIdentity />}
              disableRipple
            >
              아이디
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <Typography variant="body1">{operator.USER_ID}</Typography>
          </Grid>
          {/*  */}
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
              helperText={errors.NAME?.message}
              error={Boolean(errors.NAME)}
              {...register(FormKey.NAME, {
                required: '아이디를 입력해주세요.',
                maxLength: {
                  value: 3,
                  message: '4자 이하로 입력해주세요.',
                },
              })}
            />
          </Grid>
          {/*  */}
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
              type="password"
              id="standard-required"
              placeholder="비밀번호를 입력해주세요."
              helperText={errors.PASSWORD?.message}
              error={Boolean(errors.PASSWORD)}
              {...register(FormKey.PASSWORD, {
                required: '아이디를 입력해주세요.',
                minLength: {
                  value: 4,
                  message: '4 ~ 16자로 입력해주세요.',
                },
                maxLength: {
                  value: 16,
                  message: '4 ~ 16자로 입력해주세요.',
                },
              })}
            />
          </Grid>
          {/*  */}
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<EnhancedEncryption />}
              disableRipple
              type="password"
            >
              비밀번호 확인
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="비밀번호를 입력해주세요."
              {...register(FormKey.PASSWORD_CONFIRM, {
                required: true,
                maxLength: 10,
              })}
            />
          </Grid>
          {/*  */}
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
          {/*  */}
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
          {/*  */}
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<VerifiedUser />}
              disableRipple
            >
              관리등급
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <FormGroup row>
              <Controller
                name={FormKey.AUTHORITIES}
                control={control}
                // defaultValue={false}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    {authorityList.map((item: AuthorityVO) => {
                      return (
                        <FormControlLabel
                          key={item.ID}
                          control={
                            <Checkbox
                              checked={
                                field.value[
                                  item.AUTHORITY_KEY as AuthorityKeyType
                                ]
                              }
                              onChange={(event) => {
                                const { checked, name } = event.target;
                                const formState = field.value;
                                setValue(FormKey.AUTHORITIES, {
                                  ...formState,
                                  [name]: checked,
                                });
                              }}
                              name={item.AUTHORITY_KEY}
                              color="primary"
                            />
                          }
                          label={item.NAME}
                        />
                      );
                    })}
                  </>
                )}
              />
            </FormGroup>
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
