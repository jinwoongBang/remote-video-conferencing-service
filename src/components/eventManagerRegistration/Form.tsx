/**
 * React
 */
import React from 'react';
/**
 * Libarary
 */
import { useForm } from 'react-hook-form';
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
  MenuItem,
  Select,
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
  Event,
  PermIdentity,
  Lock,
  EnhancedEncryption,
  Phone,
} from '@material-ui/icons';

/**
 * Components
 */
import PhoneNumberMask from 'src/components/maskInput/PhoneNumber';
import EventVO from 'src/vo/EventVO';

type FormProps = {
  eventList: EventVO[];
};

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

function Form({ eventList }: FormProps) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <Grid
      container
      alignItems="center"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<Event />}
        >
          이벤트
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <Select
          fullWidth
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={-1}
          {...register('event')}
        >
          <MenuItem value={-1}>선택 안함</MenuItem>
          {eventList.map((event: EventVO) => (
            <MenuItem key={event.ID} value={event.ID}>
              {event.TITLE}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<PermIdentity />}
        >
          아이디
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="아이디를 입력해주세요."
          {...register('userId')}
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
          placeholder="이름을 입력해주세요."
          {...register('name')}
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<Lock />}
        >
          비밀번호
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="비밀번호를 입력해주세요."
          {...register('password')}
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<EnhancedEncryption />}
        >
          비밀번호 확인
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          {...register('passwordConfirm')}
        />
      </Grid>
      <Grid item xs={3} className={classes.inputLabelContainer}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          size="large"
          startIcon={<Phone />}
        >
          핸드폰
        </Button>
      </Grid>
      <Grid item xs={9} className={classes.inputContainer}>
        <TextField
          fullWidth
          id="standard-required"
          placeholder="핸드폰 번호를 입력해주세요."
          InputProps={{
            inputComponent: PhoneNumberMask as any,
          }}
          {...register('phoneNumber')}
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
          {...register('email')}
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
          type="submit"
        >
          등록
        </Button>
      </Grid>
    </Grid>
  );
}

export default Form;
