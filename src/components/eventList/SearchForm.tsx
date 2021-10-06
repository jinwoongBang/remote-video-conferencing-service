/**
 * React
 */
import React from 'react';

/**
 * MUI
 */
import { Grid, Paper, Typography } from '@material-ui/core';

/**
 * Default Function
 */
function SearchForm() {
  return (
    <Grid container component="section">
      <Grid item xs={12} component={Paper}>
        <Typography>상세 검색 조건</Typography>
      </Grid>
    </Grid>
  );
}

export default SearchForm;
