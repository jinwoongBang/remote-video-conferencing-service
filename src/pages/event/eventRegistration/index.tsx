import React, { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';

/**
 * Libarary
 */
import { useForm } from 'react-hook-form';
import * as _ from 'lodash';

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
} from '@material-ui/icons';

/**
 * Components
 */
import AppLayout from 'src/components/AppLayout';

/**
 * Service
 */
import ServerService from 'src/service/ServerService';
import PreferenceService from 'src/service/PreferenceService';

/**
 * VO
 */
import ServerVO from 'src/vo/ServerVO';
import { PreferenceVO } from 'src/vo';

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

enum FormKey {
  SERVER_ID = 'SERVER_ID',
  NUMBER_OF_PEOPLE = 'NUMBER_OF_PEOPLE',
}

const DEFAULT_VALUE = {
  [FormKey.SERVER_ID]: -1,
};

function EventRegistration({
  serverList,
  eventOptionList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  return (
    <AppLayout>
      <Grid container>
        <Grid item xs={3} className={classes.inputLabelContainer}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<Person />}
          >
            서버 위치
          </Button>
        </Grid>
        <Grid item xs={9} className={classes.inputContainer}>
          <Select
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={-1}
            {...register(FormKey.SERVER_ID)}
          >
            <MenuItem value={-1}>선택 안함</MenuItem>
            {serverList.map((server: ServerVO) => (
              <MenuItem key={server.ID} value={server.ID}>
                {server.NAME}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </AppLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{
  serverList: ServerVO[];
  eventOptionList: PreferenceVO[];
}> = async ({ params }) => {
  const serverList = await ServerService.selectAllServerList();
  const eventOptionList =
    await PreferenceService.selectPreferenceListByGroupKey({
      preferenceKey: 'EVENT_OPTIONS',
    });
  return {
    props: {
      serverList,
      eventOptionList,
    },
  };
};

export default EventRegistration;
