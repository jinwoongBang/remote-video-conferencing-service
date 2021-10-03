/**
 * React
 */
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
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { PreferenceVO } from 'src/vo';
import { UseFormRegister } from 'react-hook-form';
import { FormKey } from 'src/pages/event/eventRegistration';

type EventOptionSwitchProps = {
  eventOption: PreferenceVO;
  formRegister: UseFormRegister<any>;
};

const useStyles = makeStyles((theme: Theme) => ({
  eventOptionSwitch: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
  },
}));

function EventOptionSwitch({
  eventOption,
  formRegister,
}: EventOptionSwitchProps) {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={2}
      key={eventOption.ID}
      className={classes.eventOptionSwitch}
    >
      <FormControlLabel
        {...formRegister(
          `${FormKey.OPTION_LIST}.${eventOption.PREFERENCE_KEY}`,
        )}
        control={<Switch color="primary" />}
        label={eventOption.NAME}
        labelPlacement="top"
      />
    </Grid>
  );
}

export default EventOptionSwitch;
