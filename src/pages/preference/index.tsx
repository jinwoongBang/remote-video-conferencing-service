/**
 * React
 */
import React, { useEffect, useMemo, useState } from 'react';

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
import {
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
import PreferenceService from 'src/service/PreferenceService';
import { PreferenceVO } from 'src/vo';

/**
 * common
 */
import { PreferenceKey } from 'src/common/preference';

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

function Preference({
  preferenceList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

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
          >
            수정
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
