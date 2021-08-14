/**
 * React
 */
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  Component,
  ErrorInfo,
  ReactNode,
} from 'react';

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
} from 'recoil';

/**
 *  Material UI
 */
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Copyright,
  Create,
  Mail,
  PanoramaSharp,
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
import PreferenceService from 'src/service/PreferenceService';
import { PreferenceVO } from 'src/vo';

/**
 * common
 */
import { PreferenceKey } from 'src/common/enum/preference';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

/**
 * store
 */
import {
  insertSiteInformationSelector,
  siteInformationState,
} from 'src/store/preference';

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

/**
 * Default Function
 */
function Preference({
  preferenceList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  /**
   * Recoil
   */
  const insertLoadable = useRecoilValueLoadable(insertSiteInformationSelector);
  const requestInsertSiteInformation = useSetRecoilState(siteInformationState);

  /**
   * useMemo
   */
  const isLoading = useMemo(
    () => insertLoadable.state === 'loading',
    [insertLoadable.state],
  );

  /**
   * useState
   */
  const [name, setName] = useState<string>(
    () =>
      preferenceList.find(
        ({ PREFERENCE_KEY }) =>
          PREFERENCE_KEY === PreferenceKey.RepresentativeName,
      )?.PREFERENCE_VALUE ?? '',
  );

  const [phoneNumber, setPhoneNumber] = useState<string>(
    () =>
      preferenceList.find(
        ({ PREFERENCE_KEY }) =>
          PREFERENCE_KEY === PreferenceKey.RepresentativePhone,
      )?.PREFERENCE_VALUE ?? '',
  );

  const [mail, setMail] = useState<string>(
    () =>
      preferenceList.find(
        ({ PREFERENCE_KEY }) =>
          PREFERENCE_KEY === PreferenceKey.RepresentativeMail,
      )?.PREFERENCE_VALUE ?? '',
  );

  const [copyright, setCopyright] = useState<string>(
    () =>
      preferenceList.find(
        ({ PREFERENCE_KEY }) =>
          PREFERENCE_KEY === PreferenceKey.CopyrightSignature,
      )?.PREFERENCE_VALUE ?? '',
  );

  /**
   * useEffect
   */
  useEffect(() => {
    return () => {
      requestInsertSiteInformation((state) => ({ ...state, isInit: false }));
    };
  }, []);

  /**
   * useCallback
   */
  const handleChangeName = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setName(event.target.value);
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

  const handleChangeCopyright = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setCopyright(event.target.value);
    },
    [],
  );

  const handleModifySiteInformation = useCallback(
    (event: React.MouseEvent) => {
      const param = {
        isInit: true,
        name,
        phoneNumber,
        mail,
        copyright,
      };
      requestInsertSiteInformation(param);
    },
    [name, phoneNumber, mail, copyright],
  );

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
            대표자 성명
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표자 성명을 입력해주세요."
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
            startIcon={<PhoneAndroid />}
          >
            대표 번호
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표 휴대전화 번호를 입력해주세요."
            InputProps={{
              inputComponent: PhoneNumberMask as any,
            }}
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
            대표 메일
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="대표 메일을 입력해주세요. ex) ontheair@ontheair.com"
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
            startIcon={<Copyright />}
          >
            Copyright
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <TextField
            fullWidth
            id="standard-required"
            placeholder="저작권 문구를 입력해주세요."
            value={copyright}
            onChange={handleChangeCopyright}
            disabled={isLoading}
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
            onClick={handleModifySiteInformation}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size="1.8em" /> : '수정'}
          </Button>
        </Grid>
      </Grid>
    </ApoLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{
  preferenceList: PreferenceVO[];
}> = async ({ params }) => {
  const preferenceList = await PreferenceService.selectPreferenceListByGroupKey(
    {
      preferenceKey: 'SITE_INFORMATION',
    },
  );
  return {
    props: {
      preferenceList,
    },
  };
};

export default Preference;
