import React, { useCallback, useEffect, useState } from 'react';

/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';

/**
 * recoil
 */
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

/**
 * store
 */
import { authState, counterState } from 'src/store';
import UserVO from 'src//vo/UserVO';

/**
 * db
 */
import UserService from 'src/service/UserService';

/**
 *  Material UI
 */
import {
  Button,
  Divider,
  Grid,
  TextField,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Copyright,
  Create,
  Mail,
  Person,
  PhoneAndroid,
  Receipt,
} from '@material-ui/icons';

import MaskedInput from 'react-text-mask';

import PropTypes from 'prop-types';
/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';
import { registrationUser, reqUserState } from 'src/store/reqUserAtom';
import { reqUser } from 'src/vo';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

function TextMaskCustom(props: { [x: string]: any; inputRef: any }) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[0-1]/,
        /[0-1]/,
        /[0-1]/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function Registration() {
  const valueRegistari = useRecoilValue(registrationUser);
}

interface PhoneNumberMaskProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function PhoneNumberMask(props: PhoneNumberMaskProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[0]/,
        /[1]/,
        /[0]/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      // placeholderChar={'\u2000'}
      showMask
      guide={true}
      keepCharPositions={true}
    />
  );
}

function UserRegistration({
  userList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('getStaticProps() :: no hooks');

  const setReqUserState = useSetRecoilState(reqUserState);
  // const valueRegistari = useRecoilValue(registrationUser)

  const reqUserSetting = (): reqUser => ({
    userPassword: userPw,
    userName: name,
    status: Number(status),
    userId: userId,
    event: event,
    phone: phone,
    // phone: phone.textmask,
    email: email,
    job: job,
    belongTo: belongTo,
    isUsedRecipt: isUsedRecipt,
    nationality: nationality ?? null,
    licenseNumber: licenseNumber ?? null,
    specialListNumber: specialListNumber ?? null,
    societyRrequest: societyRrequest ?? null,
    depositAmount: depositAmount ?? null,
  });

  const [auth, setAuth] = useRecoilState(authState);

  const [status, setStatus] = useState<string>();
  const [event, setEvent] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [userPw, setUserPw] = useState<string>();
  const [name, setName] = useState<string>();
  // const [phone, setPhone] = React.useState({
  //   textmask: '010',
  //   numberformat: '1320',
  // });
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [job, setJob] = useState<string>();
  const [belongTo, setBelongTo] = useState<string>();
  const [isUsedRecipt, setIsUsedRecipt] = useState<string>();
  const [nationality, setNationality] = useState<string>();
  const [licenseNumber, setLicenseNumber] = useState<string>();
  const [specialListNumber, setSpecialListNumber] = useState<string>();
  const [societyRrequest, setSocietyRrequest] = useState<string>();
  const [depositAmount, setDepositAmount] = useState<string>();
  const [age, setAge] = useState<string>('');

  const useStyles = makeStyles((theme) => ({
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
    },
    modifyButton: {
      width: '200px',
    },
    divider: {
      padding: '15px',
    },

    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    paper2: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const handleChangeStatus = useCallback(
    (event: React.ChangeEvent<{ value: unknown; name?: string }>) => {
      const { name, value } = event.target;
      setStatus(value as string);
    },
    [],
  );

  const handleChangeEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setEvent(value);
    },
    [],
  );
  const handleChangeUserId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserId(value);
    },
    [],
  );
  const handleChangeUserPw = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserPw(value);
    },
    [],
  );
  const handleChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setName(value);
    },
    [],
  );
  // const handleChangePhone = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;
  //     setPhone(value);
  //   },
  //   [],
  // );

  const handleChangePhone = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setPhone(value);
    },
    [],
  );

  // const handleChangePhone = (event: { target: { name: any; value: any } }) => {
  //   setPhone({
  //     ...phone,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setEmail(value);
    },
    [],
  );
  const handleChangeJob = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setJob(value);
    },
    [],
  );
  const handleChangeBelongTo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setBelongTo(value);
    },
    [],
  );
  const handleChangeRecipt = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string }>) => {
      const { name, value } = event.target;
      setIsUsedRecipt(value);
    },
    [],
  );
  const handleChangeNationality = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string }>) => {
      const { name, value } = event.target;
      setNationality(value);
    },
    [],
  );
  const handleChangeLicenseNumber = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string }>) => {
      const { name, value } = event.target;
      setLicenseNumber(value);
    },
    [],
  );
  const handleChangeSpecialListNumber = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string }>) => {
      const { name, value } = event.target;
      setSpecialListNumber(value);
    },
    [],
  );
  const handleChangeSocietyRrequest = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string }>) => {
      const { name, value } = event.target;
      setSocietyRrequest(value);
    },
    [],
  );
  const handleChangeDepositAmount = useCallback(
    (event: React.ChangeEvent<{ value: any; name?: string }>) => {
      const { name, value } = event.target;
      setDepositAmount(value);
    },
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const payload = reqUserSetting();
      console.log(
        `변경된 패스워드 reqUserSetting22: ${JSON.stringify(payload)}`,
      );
      const { data, status } = await HttpClient.post(
        '/user',
        payload as reqUser,
      );
      const { success, result } = new OTAResponse<UserVO>(data);
      console.log('success: ' + success + '  // result: ' + result);
      console.log(
        'success: ' +
          success +
          '  // result stringify: ' +
          JSON.stringify(result),
      );
    } catch (error) {
      setError({ isError: true, message: error.message });
      console.error(error);
    }
  };

  useEffect(() => {
    const user = userList[0] || null;
    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, []);

  const classes = useStyles();

  return (
    <ApoLayout>
      <form onSubmit={handleSubmit}>
        <Grid className={classes.root} container alignItems="center">
          <Grid item xs={1} className={classes.divider}>
            <Divider />
          </Grid>
          <Grid item xs={1} className={classes.divider}>
            <label>필수</label>
          </Grid>
          <Grid item xs={10} className={classes.divider}>
            <Divider />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Person />}
            >
              회원상태
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <Select
              labelId="statusLabel"
              id="status"
              value={status}
              onChange={handleChangeStatus}
              label="UserStatus"
              required
            >
              <MenuItem value={'0'}>상태0</MenuItem>
              <MenuItem value={'1'}>상태1</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<PhoneAndroid />}
            >
              이벤트
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="TODO 서버에서 가져와서 리스트 보여주는거로 바꿔야함"
              value={event}
              onChange={handleChangeEvent}
              required
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
              아이디
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="회원 아이디를 입력해주세요."
              value={userId}
              onChange={handleChangeUserId}
              required
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              비밀번호
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="회원 비밀번호를 입력해주세요."
              value={userPw}
              onChange={handleChangeUserPw}
              required
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              이름
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="회원 이름을 입력해주세요."
              value={name}
              onChange={handleChangeName}
              required
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              연락처
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="휴대전화 번호를 입력해주세요."
              InputProps={{
                inputComponent: PhoneNumberMask as any,
              }}
              value={phone}
              onChange={handleChangePhone}
              required
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              이메일
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="이메일을 입력해주세요. ex) ontheair@ontheair.com"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              직업
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="직업을 입력해주세요."
              value={job}
              onChange={handleChangeJob}
              required
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              소속
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="소속을 입력해주세요."
              value={belongTo}
              onChange={handleChangeBelongTo}
              required
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              영수증 사용 여부
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <Select
              labelId="isUsedReciptLabel"
              id="isUsedRecipt"
              value={isUsedRecipt}
              onChange={handleChangeRecipt}
              label="IsUsedRecipt"
              required
            >
              <MenuItem value={'0'}>상태0</MenuItem>
              <MenuItem value={'1'}>상태1</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={1} className={classes.divider}>
            <Divider />
          </Grid>
          <Grid item xs={2} className={classes.divider}>
            <label>선택 사항</label>
          </Grid>
          <Grid item xs={9} className={classes.divider}>
            <Divider />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              국적
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="국적을 입력해주세요."
              value={nationality}
              onChange={handleChangeNationality}
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              면허 번호
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="면허 번호를 입력해주세요."
              value={licenseNumber}
              onChange={handleChangeLicenseNumber}
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              전문의번호
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="전문의번호를 입력해주세요."
              value={specialListNumber}
              onChange={handleChangeSpecialListNumber}
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              학회 요청 사항
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="학회 요청 사항을 입력해주세요."
              value={societyRrequest}
              onChange={handleChangeSocietyRrequest}
            />
          </Grid>

          <Grid item xs={3} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Copyright />}
            >
              입금액
            </Button>
          </Grid>
          <Grid item xs={9} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="입금액을 입력해주세요."
              value={depositAmount}
              onChange={handleChangeDepositAmount}
            />
          </Grid>

          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>

          <Grid item xs={12} className={classes.buttonContaier}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.modifyButton}
              startIcon={<Create />}
              type="submit"
            >
              회원 등록
            </Button>
          </Grid>
        </Grid>
      </form>
    </ApoLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ userList: UserVO[] }> = async ({
  params,
}) => {
  // const userList: UserVO[] = await UserService.selectUser();

  return {
    props: {
      userList: [],
    },
  };
};

export default UserRegistration;

function setError(arg0: { isError: boolean; message: any }) {
  throw new Error('Function not implemented.');
}
