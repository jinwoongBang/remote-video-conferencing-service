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
import { forcedReloadOperatorListState } from 'src/store/operator';

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
  operator: OperatorVO;
  onOpen: () => void;
};

function ModifyForm({ operator, onOpen }: ModifyFormProps) {
  const classes = useStyles();

  const authorityList = useRecoilValue(authorityState);

  const [name, setName] = useState(operator.NAME || '');
  const [status, setStatus] = useState(operator.STATUS || 0);
  const [password, setPassword] = useState(operator.PASSWORD || '');
  const [passwordConfirm, setPasswordConfirm] = useState(
    operator.PASSWORD || '',
  );
  const [phoneNumber, setPhoneNumber] = useState(operator.PHONE_NUMBER || '');
  const [email, setEmail] = useState(operator.EMAIL || '');
  const [selectedAuthorities, setSelectedAuthorities] = useState(() => {
    const auth: {
      [key: string]: boolean;
    } = {};
    authorityList.forEach((item) => {
      auth[item.AUTHORITY_KEY as string] = operator[item.AUTHORITY_KEY];
    });
    return auth;
  });

  const handleChangeName = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setName(event.target.value);
    },
    [],
  );

  const handleChangeStatus = useCallback(
    (event: React.ChangeEvent<{ checked: boolean; name: string }>) => {
      setStatus(Boolean(event.target.checked) ? 1 : 0);
    },
    [],
  );

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setPassword(event.target.value);
    },
    [],
  );
  const handleChangePasswordConfirm = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setPasswordConfirm(event.target.value);
    },
    [],
  );
  const handleChangePhoneNumber = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setPhoneNumber(event.target.value);
    },
    [],
  );

  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setEmail(event.target.value);
    },
    [],
  );

  const handleChangeAuthority = useCallback(
    (event: React.ChangeEvent<{ name: string; checked: boolean }>) => {
      const { checked, name } = event.target;
      setSelectedAuthorities((state) => ({ ...state, [name]: checked }));
    },
    [],
  );

  const handleSubmitModifyOperator = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          const user = new OperatorVO();
          user.ID = operator.ID;
          user.NAME = name;
          user.STATUS = status;
          user.PASSWORD = password;
          user.PHONE_NUMBER = phoneNumber;
          user.EMAIL = email;
          user.AUTHORITIES = user.createAuthorityIdList(
            authorityList,
            selectedAuthorities,
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
    <>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
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
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>비활성</Grid>
                  <Grid item>
                    <AntSwitch
                      checked={status === 1}
                      onChange={handleChangeStatus}
                      name="status"
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
                value={name}
                onChange={handleChangeName}
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
                id="standard-required"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={handleChangePassword}
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
                비밀번호 확인
              </Button>
            </Grid>
            <Grid item xs={4} className={classes.inputContainer}>
              <TextField
                fullWidth
                id="standard-required"
                placeholder="비밀번호를 입력해주세요."
                value={passwordConfirm}
                onChange={handleChangePasswordConfirm}
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
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
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
                value={email}
                onChange={handleChangeEmail}
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
                {authorityList.map((item: AuthorityVO) => {
                  return (
                    <FormControlLabel
                      key={item.ID}
                      control={
                        <Checkbox
                          checked={selectedAuthorities[item.AUTHORITY_KEY]}
                          onChange={handleChangeAuthority}
                          name={item.AUTHORITY_KEY}
                          color="primary"
                        />
                      }
                      label={item.NAME}
                    />
                  );
                })}
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOpen} color="secondary" variant="outlined">
          취소
        </Button>
        <Button
          onClick={handleSubmitModifyOperator}
          color="primary"
          variant="outlined"
          autoFocus
        >
          확인
        </Button>
      </DialogActions>
    </>
  );
}
export default ModifyForm;
