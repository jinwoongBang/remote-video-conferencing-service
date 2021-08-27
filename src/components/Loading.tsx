import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));
function Loading() {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default Loading;
