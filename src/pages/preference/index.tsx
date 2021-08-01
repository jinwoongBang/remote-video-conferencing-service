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
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

/**
 * VO
 */
import UserVO from 'src/vo/UserVO';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';

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
}));

function Preference({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();
  return (
    <ApoLayout>
      <Grid container alignItems="center">
        <Grid item xs={3} className={classes.inputLabelContainer}>
          <Button fullWidth color="primary" variant="outlined">
            대표자 성명
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
          <Button fullWidth color="primary" variant="outlined">
            대표 번호
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
          <Button fullWidth color="primary" variant="outlined">
            대표 메일
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표 메일을 입력해주세요."
          />
        </Grid>
        <Grid item xs={3} className={classes.inputLabelContainer}>
          {/* <Typography variant="caption">Copyright</Typography> */}
          <Button fullWidth color="primary" variant="outlined">
            Copyright
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="저작권 문구를 입력해주세요."
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} className={classes.buttonContaier}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.modifyButton}
          >
            수정
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

export default Preference;
