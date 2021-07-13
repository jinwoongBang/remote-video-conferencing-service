import React from 'react';

/**
 * Next
 */
import Head from 'next/head';
import Image from 'next/image';

/**
 * Material UI
 */
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Inbox, Mail } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>test Home</h1>
    </div>
  );
}

export default Home;
