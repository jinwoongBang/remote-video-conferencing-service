import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import { Breadcrumbs, Typography, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { NavigateNext } from '@material-ui/icons';

import { PreferencePath } from 'src/common/path';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: '10px',
  },
}));

function BreadcrumbsList() {
  const classes = useStyles();
  const router = useRouter();

  const name = useMemo(() => {
    /**
     * TODO: 동적으로 변경되도록 추가해야함
     */
    const pathList = router.pathname.split('/');
    const rootPath = pathList[1] || '대시보드';
    return { rootPath, childPath: pathList[2] || null };
  }, [router.pathname]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Typography color="textPrimary">{name.rootPath}</Typography>
          {name.childPath && (
            <Typography color="textPrimary">{name.childPath}</Typography>
          )}
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
}

export default BreadcrumbsList;
