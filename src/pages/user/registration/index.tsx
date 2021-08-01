import React, {useCallback, useEffect, useState } from 'react';

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

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import PropTypes from "prop-types";
/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';
import { registrationUser, reqUserState } from 'src/store/reqUserAtom';
import { reqUser } from 'src/vo';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[0-1]/, /[0-1]/, /[0-1]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function Registration() {
  const valueRegistari = useRecoilValue(registrationUser)
}

function UserRegistration({
  userList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('getStaticProps() :: no hooks');

  const setReqUserState = useSetRecoilState(reqUserState)
  // const valueRegistari = useRecoilValue(registrationUser)
  
  const reqUserSetting = (): reqUser => ({
    userPassword: userPw,
    userName: name,
    status: Number(status),
    userId: userId,
    event: event,
    phone: phone.textmask,    
    email: email,    
    job: job,    
    belongTo: belongTo,    
    isUsedRecipt: isUsedRecipt,    
    nationality: null,    
    licenseNumber: null,    
    specialListNumber: null,    
    societyRrequest: null,    
    depositAmount: null,
  })

  const [auth, setAuth] = useRecoilState(authState);

  const [status, setStatus] = useState<string>();
  const [event, setEvent] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [userPw, setUserPw] = useState<string>();
  const [name, setName] = useState<string>();
  const [phone, setPhone] = React.useState({
    textmask: "010",
    numberformat: "1320"
  });
  // const [phone, setPhone] = React.useState({
  //   textmask: "(010)    -    ",
  //   numberformat: "1320"
  // });
  const [email, setEmail] = useState<string>();
  const [job, setJob] = useState<string>();
  const [belongTo, setBelongTo] = useState<string>();
  const [isUsedRecipt, setIsUsedRecipt] = useState<string>();
  const [age, setAge] = useState<string>("");
  
  const useStyles = makeStyles((theme) => ({
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
      minWidth: 120
    },
  }));
  
  const handleChangeStatus = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setStatus(value);
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

  const handleChangePhone = (event) => {
    setPhone({
      ...phone,
      [event.target.name]: event.target.value
    });
  };
  
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setIsUsedRecipt(value);
    },
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const payload = reqUserSetting()
      console.log(`변경된 패스워드 reqUserSetting22: ${JSON.stringify(payload)}`);
      const { data, status } = await HttpClient.post(
        '/user',
        payload as reqUser,
      );
      const { success, result } = new OTAResponse<UserVO>(data);
      console.log("success: " + success + "  // result: " + result)
      console.log("success: " + success + "  // result stringify: " + JSON.stringify(result))
    } catch (error) {
      setError({ isError: true, message: error.message });
      console.error(error);
    }
  };

  useEffect(() => {
    const user = userList[0] || null;
    setAuth((currVal) => ({ ...currVal, user }));
    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, []);

  const classes = useStyles();

  return (
    <ApoLayout>
      <div className={classes.root}>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
          <label htmlFor="status">회원상태</label>
          </Grid>
          <Grid item xs={9}>
          <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="statusLabel">회원상태</InputLabel>
              <Select
                labelId="statusLabel"
                id="status"
                value={status}
                onChange={handleChangeStatus}
                label="UserStatus"
                required
              >              
                <MenuItem value={"0"}>상태0</MenuItem>
                <MenuItem value={"1"}>상태1</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="event">이벤트</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="event" label="이벤트" variant="outlined" onChange={handleChangeEvent} autoComplete="event" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="userId">아이디</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="userId" label="아이디" variant="outlined" onChange={handleChangeUserId} autoComplete="userId" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="userPw">비밀번호</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="userPw" label="비밀번호" variant="outlined" onChange={handleChangeUserPw} autoComplete="userPw" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="name">이름</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="name" label="이름" variant="outlined" onChange={handleChangeName} autoComplete="name" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="phoneNumber">연락처</label>
          </Grid>
          <TextField id="phoneNumber" label="연락처" variant="outlined" onChange={handleChangePhone} autoComplete="email" required/>
          {/* <Grid item xs={9}>
            <FormControl required>
              <InputLabel htmlFor="phoneNumber">연락처</InputLabel>
              <Input
                value={phone.textmask}
                onChange={handleChangePhone}
                name="textmask"
                id="phoneNumber"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
          </Grid> */}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="email">이메일</label>
          </Grid>
          <Grid item xs={9}>
          <TextField id="email" label="이메일" variant="outlined" onChange={handleChangeEmail} autoComplete="email" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="job">직업</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="job" label="직업" variant="outlined" onChange={handleChangeJob} autoComplete="job" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="belongTo">소속</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="belongTo" label="소속" variant="outlined" onChange={handleChangeBelongTo} autoComplete="belongTo" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="isUsedRecipt">영수증 사용 여부</label>
          </Grid>
          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="isUsedReciptLabel">영수증 사용 여부</InputLabel>
              <Select
                labelId="isUsedReciptLabel"
                id="isUsedRecipt"
                value={isUsedRecipt}
                onChange={handleChangeRecipt}
                label="isUsedRecipt"
                required
              >
              
                <MenuItem value={1}>사용</MenuItem>
                <MenuItem value={0}>사용안함</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <button type="submit">Register</button>
      </form>
      </div>
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

function setError(arg0: { isError: boolean; message: any; }) {
  throw new Error('Function not implemented.');
}

