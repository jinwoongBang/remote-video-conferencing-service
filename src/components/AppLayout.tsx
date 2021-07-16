import React, { useCallback, useMemo } from 'react';

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
    border: '1xp solid tomato',
    flexGrow: 1,
    // paddingTop: '112px',
    maxWidth: `calc(100vw - ${drawerWidth}px)`,
    minWidth: `${1440 - drawerWidth}px`,
    // height: '120vh',
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

    '& > *': {
      marginLeft: '10px',
    },
  },
}));

type ApoLayoutProps = {
  children: JSX.Element;
};

function ApoLayout({ children }: ApoLayoutProps) {
  const classes = useStyles();
  const router = useRouter();

  const sideBarMenuList = useMemo(() => {
    switch (router.pathname) {
      case '/':
        return ['사이트 현황', '현황판'];
      case '/preference':
        return [
          '사이트 정보관리',
          '운영자 목록',
          '운영자 등록',
          '이벤트 관리자 목록',
          '이벤트 관리자 등록',
        ];
    }
    return ['Home', 'Starred', 'Send email', 'Drafts'];
  }, [router.pathname]);

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
              <Typography variant="body2">께서 로그인하셨습니다.</Typography>
              <Button variant="outlined" color="inherit">
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider></Divider>
        <Toolbar variant="dense">
          <Grid container justify="space-between">
            <Grid item xs={2}>
              <Typography variant="body1" align="center">
                대시보드
              </Typography>
            </Grid>
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
            {sideBarMenuList.map((text, index) => (
              <ListItem button key={text} onClick={() => handleClickMenu('/')}>
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
        <Toolbar variant="dense" />
        <Container maxWidth={false} disableGutters>
          {children}
        </Container>
      </main>
    </div>
  );
}

export default ApoLayout;
