import React, { useEffect } from 'react';

/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';

/**
 * recoil
 */
import { useRecoilState, useSetRecoilState } from 'recoil';

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

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function UserRegistration({
  userList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('getStaticProps() :: no hooks');
  const [auth, setAuth] = useRecoilState(authState);
  const [age, setAge] = React.useState("");
  
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

  const [values, setValues] = React.useState({
    textmask: "(1  )    -    ",
    numberformat: "1320"
  });
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`변경된 패스워드 name: ${event.target.name.value}`);
    console.log(`변경된 패스워드 id: ${event.target.userId.text}`);
    console.log(`변경된 패스워드 pw: ${event.target.userPw}`);
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
          <Grid item xs={3} >
          <label htmlFor="name">회원상태</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="name" label="회원상태" variant="outlined" autoComplete="name" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="event">이벤트</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="event" label="이벤트" variant="outlined" autoComplete="event" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="userId">아이디</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="userId" label="아이디" variant="outlined" autoComplete="userId" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="userPw">비밀번호</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="userPw" label="비밀번호" variant="outlined" autoComplete="userPw" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="name">이름</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="name" label="이름" variant="outlined" autoComplete="name" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="phoneNumber">연락처</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="phoneNumber" label="연락처" variant="outlined" autoComplete="phoneNumber" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="email">이메일</label>
          </Grid>
          <Grid item xs={9}>
            <FormControl>
            <InputLabel htmlFor="email">이메일</InputLabel>
            <Input
              value={values.textmask}
              onChange={handleChange}
              name="textmask"
              id="email"
              inputComponent={TextMaskCustom}
            />
          </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="job">직업</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="job" label="직업" variant="outlined" autoComplete="job" required/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3} >
          <label htmlFor="belongTo">소속</label>
          </Grid>
          <Grid item xs={9}>
            <TextField id="belongTo" label="소속" variant="outlined" autoComplete="belongTo" required/>
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
                value={age}
                onChange={handleChangeAge}
                label="Age"
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
