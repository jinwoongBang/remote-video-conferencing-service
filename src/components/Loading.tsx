import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

function Loading() {
  return (
    <Grid container justify="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default Loading;
