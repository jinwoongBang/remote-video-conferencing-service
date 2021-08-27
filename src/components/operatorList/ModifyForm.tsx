import React, { useState } from 'react';

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
} from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core';
import { Person } from '@material-ui/icons';

import OperatorVO from 'src/vo/OperatorVO';
import { useCallback } from 'react';

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
};

function ModifyForm({ operator }: ModifyFormProps) {
  const classes = useStyles();
  const [name, setName] = useState(operator.NAME || '');
  const [status, setStatus] = useState(operator.STATUS || 0);

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

  return (
    <DialogContent dividers>
      <DialogContentText id="alert-dialog-description">
        <Grid container alignItems="center">
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="large"
              startIcon={<Person />}
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
              startIcon={<Person />}
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
              startIcon={<Person />}
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
              startIcon={<Person />}
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
              startIcon={<Person />}
              disableRipple
            >
              핸드폰
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="비밀번호를 입력해주세요."
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
              startIcon={<Person />}
              disableRipple
            >
              이메일
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <TextField
              fullWidth
              id="standard-required"
              placeholder="비밀번호를 입력해주세요."
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
              startIcon={<Person />}
              disableRipple
            >
              관리등급
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={false} name="Role" color="primary" />
                }
                label="환경설정"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={false} name="Role" color="primary" />
                }
                label="회원관리"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={false} name="Role" color="primary" />
                }
                label="이벤트관리"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={false} name="Role" color="primary" />
                }
                label="특별관리"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContentText>
    </DialogContent>
  );
}
export default ModifyForm;
