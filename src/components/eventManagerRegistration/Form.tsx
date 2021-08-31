import React from 'react';
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
  HowToReg,
  Mail,
  Person,
  PhoneAndroid,
  SecurityRounded,
  SecuritySharp,
  VpnKey,
  VerifiedUser,
} from '@material-ui/icons';

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

function Form() {
  const classes = useStyles();
  return (
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
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="대표자 성명을 입력해주세요."
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
          placeholder="대표 휴대전화 번호를 입력해주세요."
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<VpnKey />}
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
          startIcon={<PhoneAndroid />}
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
        >
          등록
        </Button>
      </Grid>
    </Grid>
  );
}

export default Form;
