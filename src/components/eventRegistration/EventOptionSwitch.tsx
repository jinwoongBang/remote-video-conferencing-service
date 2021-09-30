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

type EventOptionSwitchProps = {
  eventOption: PreferenceVO;
};

const useStyles = makeStyles((theme: Theme) => ({
  eventOptionSwitch: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
  },
}));

function EventOptionSwitch({ eventOption }: EventOptionSwitchProps) {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={2}
      key={eventOption.ID}
      className={classes.eventOptionSwitch}
    >
      <FormControlLabel
        value="top"
        control={<Switch color="primary" />}
        label={eventOption.NAME}
        labelPlacement="top"
      />
    </Grid>
  );
}

export default EventOptionSwitch;
