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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
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
              {t('user.status')}
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>{t('user.statusInactive')}</Grid>
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
                <Grid item>{t('user.statusActive')}</Grid>
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
              {t('user.id')}
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
              {t('user.name')}
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder={t('message.operator.placeholderOfName')}
              helperText={errors.NAME?.message}
              error={Boolean(errors.NAME)}
              {...register(FormKey.NAME, {
                required: {
                  value: true,
                  message: t('message.operator.requiredName'),
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
              {t('user.password')}
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <TextField
              fullWidth
              type="password"
              id="standard-required"
              placeholder={t('message.operator.placeholderOfPassword')}
              helperText={
                errors.PASSWORD
                  ? errors.PASSWORD?.message
                  : t('message.operator.helperTextOfPassword')
              }
              error={Boolean(errors.PASSWORD)}
              {...register(FormKey.PASSWORD, {
                required: {
                  value: true,
                  message: t('message.operator.requiredPassword'),
                },
                minLength: {
                  value: 4,
                  message: t('message.operator.passwordMinLength'),
                },
                maxLength: {
                  value: 16,
                  message: t('message.operator.passwordMaxLength'),
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
            >
              {t('user.passwordConfirm')}
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder={t('message.operator.placeholderOfPassword')}
              type="password"
              error={Boolean(errors.PASSWORD_CONFIRM)}
              helperText={errors.PASSWORD_CONFIRM?.message}
              {...register(FormKey.PASSWORD_CONFIRM, {
                required: {
                  value: true,
                  message: t('message.operator.requiredPasswordConfirm'),
                },
                validate: {
                  positive: (value) =>
                    value === getValues('PASSWORD') ||
                    (t('message.operator.mismatchedPassword') as string),
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
              startIcon={<Phone />}
              disableRipple
            >
              {t('user.phoneNumber')}
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <TextField
              fullWidth
              placeholder={t('message.operator.placeholderOfPhoneNumber')}
              InputProps={{
                inputComponent: PhoneNumberMask as any,
              }}
              error={Boolean(errors.PHONE_NUMBER)}
              helperText={errors.PHONE_NUMBER?.message}
              {...register(FormKey.PHONE_NUMBER, {
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: t('message.operator.incorrectPhoneNumber'),
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
              error={Boolean(errors.EMAIL)}
              helperText={errors.EMAIL?.message}
              {...register(FormKey.EMAIL, {
                pattern: {
                  value:
                    /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i,
                  message: '정확한 이메일 주소를 입력해주세요.',
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
