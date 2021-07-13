import React, { useCallback } from 'react';

/**
 * Next
 */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  Button,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Inbox, Mail } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: `calc(100vw - ${drawerWidth}px)`,
    minWidth: `${1440 - drawerWidth}px`,
  },

  subHeader: {
    textAlign: 'center',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

type ApoLayoutProps = {
  children: JSX.Element;
};

function ApoLayout({ children }: ApoLayoutProps) {
  const classes = useStyles();
  const router = useRouter();

  const handleClickMenu = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router],
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item xs={6} className={classes.logoContainer}>
              <Typography variant="body1">On The Air 로고</Typography>
            </Grid>
            <Grid item xs={3} className={classes.rightContainer}>
              <Typography variant="body1">전체관리자</Typography>
              <Typography variant="body2"> 께서 로그인하셨습니다.</Typography>
              <Button variant="outlined">로그아웃</Button>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider></Divider>
        <Toolbar variant="dense">
          <Grid container justify="space-between">
            <Grid item xs={2}>
              <Typography variant="body1" align="center">
                환경설정
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" align="center">
                회원관리
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" align="center">
                이벤트관리
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" align="center">
                특별관리
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Toolbar variant="dense" />
        <div className={classes.drawerContainer}>
          <List>
            {['Home', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text} onClick={() => handleClickMenu('/')}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Before1', 'Trash', 'Spam'].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => handleClickMenu('/example/before1')}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <main className={classes.content}>
        <Toolbar />
        <Container maxWidth={false} disableGutters>
          {children}
        </Container>
      </main>
    </div>
  );
}

export default ApoLayout;
