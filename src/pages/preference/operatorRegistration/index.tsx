/**
 * React
 */
import React, { useEffect, useState, useCallback, useMemo } from 'react';

/**
 * Next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';

/**
 * Recoil
 */
import {
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilStateLoadable,
  useResetRecoilState,
} from 'recoil';

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
import { AuthorityVO } from 'src/vo';
import AuthorityService from 'src/service/AuthorityService';
import { AuthorityKey } from 'src/common/enum/authority';
import {
  getOperatorListSelector,
  insertOperatorSelector,
  insertOperatorState,
  forcedReloadOperatorListState,
} from 'src/store/operator';
import OperatorVO from 'src/vo/OperatorVO';

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

const createHasAuthorityKeyList = (selectedAuthorities: {
  [key: string]: boolean;
}) => {
  const list: string[] = [];
  for (let auth in selectedAuthorities) {
    const isAuth = selectedAuthorities[auth];
    isAuth && list.push(auth);
  }
  return list;
};

const createAuthorityParam = (
  selectedAuthorities: { [key: string]: boolean },
  authorityList: AuthorityVO[],
) => {
  const hasAuthKeyList: string[] =
    createHasAuthorityKeyList(selectedAuthorities);

  return authorityList
    .filter(
      (item) =>
        hasAuthKeyList.findIndex(
          (hasAuthKey) => hasAuthKey === item.AUTHORITY_KEY,
        ) !== -1,
    )
    .map((item) => item.ID)
    .join('-');
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

function OperatorRegistration({
  authorityList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  /**
   * Recoil
   */
  const insertLoadable = useRecoilValueLoadable(insertOperatorSelector);
  const requestInsertOperator = useSetRecoilState(insertOperatorState);
  const resetInsertOperator = useResetRecoilState(insertOperatorState);
  const reloadUserList = useSetRecoilState(forcedReloadOperatorListState);

  /**
   * useState
   */
  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [selectedAuthorities, setSelectedAuthorities] = useState(() => {
    const auth: {
      [key: string]: boolean;
    } = {};

    authorityList.forEach((item) => {
      auth[item.AUTHORITY_KEY as string] = false;
    });
    return auth;
  });

  /**
   * useMemo
   */
  const isLoading = useMemo(
    () => insertLoadable.state === 'loading',
    [insertLoadable.state],
  );

  /**
   * useEffect
   */
  useEffect(() => {
    return () => {
      requestInsertOperator((state) => ({ ...state, isInit: false }));
    };
  }, []);

  /**
   * useCallback
   */
  const handleChangeId = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setUserId(event.target.value);
    },
    [],
  );
  const handleChangeName = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setName(event.target.value);
    },
    [],
  );
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setPassword(event.target.value);
    },
    [],
  );
  const handleChangePhoneNumber = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setPhoneNumber(event.target.value);
    },
    [],
  );
  const handleChangeMail = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setMail(event.target.value);
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

  const handleSubmitOperator = useCallback(async () => {
    const param = {
      isInit: true,
      userId,
      name,
      password,
      phoneNumber,
      mail,
      authorities: createAuthorityParam(selectedAuthorities, authorityList),
    };
    await requestInsertOperator(param);
    // await reloadUserList((state) => state + 1);

    setUserId('');
    setName('');
    setPassword('');
    setPhoneNumber('');
    setMail('');
    setSelectedAuthorities((state) => {
      for (const key in state) {
        state[key] = false;
      }
      return state;
    });
  }, [userId, name, password, phoneNumber, mail, selectedAuthorities]);

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
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표자 성명을 입력해주세요."
            value={userId}
            onChange={handleChangeId}
            disabled={isLoading}
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
            value={name}
            onChange={handleChangeName}
            disabled={isLoading}
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
            value={password}
            onChange={handleChangePassword}
            disabled={isLoading}
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
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
            disabled={isLoading}
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
            value={mail}
            onChange={handleChangeMail}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={3} className={classes.inputLabelContainer}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<VerifiedUser />}
          >
            관리 등급
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
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
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.modifyButton}
            startIcon={<Create />}
            onClick={handleSubmitOperator}
            disabled={isLoading}
          >
            등록
          </Button>
        </Grid>
      </Grid>
    </ApoLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ authorityList: AuthorityVO[] }> =
  async ({ params }) => {
    const authorityList = await AuthorityService.selectAuthorityListByKeys({
      authorityKeys: Object.values(AuthorityKey),
    });
    return {
      props: {
        authorityList,
      },
    };
  };

export default OperatorRegistration;
