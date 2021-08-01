/**
 * React
 */
import React, { useEffect } from 'react';

/**
 * Next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';

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
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Cancel,
  Copyright,
  Create,
  Mail,
  Person,
  PhoneAndroid,
} from '@material-ui/icons';

/**
 * Library
 */
import MaskedInput from 'react-text-mask';

/**
 * VO
 */
import UserVO from 'src/vo/UserVO';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';

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
        /[0-9]/,
        /\d/,
        /\d/,
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
  },
  modifyButton: {
    width: '200px',
  },
  divider: {
    padding: '15px',
  },
}));

function OperatorRegistration({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  return (
    <ApoLayout>
      <Grid container alignItems="center">
        <Grid item xs={3} className={classes.inputLabelContainer}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            아이디
          </Button>
          {/* <Typography variant="caption">대표자 성명</Typography> */}
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표자 성명을 입력해주세요."
          />
        </Grid>
        <Grid item xs={3} className={classes.inputLabelContainer}>
          {/* <Typography variant="caption">대표 번호</Typography> */}
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<PhoneAndroid />}
          >
            이름
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표 휴대전화 번호를 입력해주세요."
          />
        </Grid>
        <Grid item xs={3} className={classes.inputLabelContainer}>
          {/* <Typography variant="caption">대표 메일</Typography> */}
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Mail />}
          >
            비밀번호
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표 메일을 입력해주세요. ex) ontheair@ontheair.com"
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
            핸드폰
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표 메일을 입력해주세요. ex) ontheair@ontheair.com"
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
            placeholder="저작권 문구를 입력해주세요."
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
            관리 등급
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="환경설정 관리"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="회원 관리"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="이벤트 관리"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="특별 관리"
            />
          </FormGroup>
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
          >
            등록
          </Button>
        </Grid>
      </Grid>
    </ApoLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ result: UserVO[] }> = async ({
  params,
}) => {
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      result: [],
    },
  };
};

export default OperatorRegistration;