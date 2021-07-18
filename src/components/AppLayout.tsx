import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Inbox, Mail } from '@material-ui/icons';

/**
 * Components
 */
import {
  DashboardSidebar,
  PreferenceSidebar,
  UserSidebar,
} from 'src/components/sidebar';

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

type SubHeader = {
  label: string;
  url: string;
  sidebar: JSX.Element;
};

const subHeaderList: SubHeader[] = [
  {
    label: '대시보드',
    url: '/',
    sidebar: <DashboardSidebar />,
  },
  {
    label: '환경설정',
    url: '/preference',
    sidebar: <PreferenceSidebar />,
  },
  {
    label: '회원관리',
    url: '/user',
    sidebar: <UserSidebar />,
  },
  {
    label: '이벤트관리',
    url: '/event',
    sidebar: <PreferenceSidebar />,
  },
  {
    label: '특별관리',
    url: '/special',
    sidebar: <PreferenceSidebar />,
  },
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ApoLayout({ children }: ApoLayoutProps) {
  const classes = useStyles();
  const router = useRouter();

  const [value, setValue] = useState<number>(0);
  const [sidebar, setSidebar] = useState(<DashboardSidebar />);

  useEffect(() => {
    const { pathname } = router;
    let index = 0;

    for (let i = 0; i < subHeaderList.length; i++) {
      const { url } = subHeaderList[i];
      const urlRegx = new RegExp(`${pathname}`, 'g');

      if (urlRegx.test(url)) {
        index = i;
        break;
      }
    }
    setValue(index);
    setSidebar(subHeaderList[index].sidebar);
  }, [router]);

  const handleClickMenu = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router],
  );

  const handleChangeTab = useCallback(
    (event: React.ChangeEvent<{}>, newValue: number) => {
      router.push(subHeaderList[newValue].url);
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
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="simple tabs example"
          >
            {subHeaderList.map((item, index) => (
              <Tab label={item.label} key={item.label} {...a11yProps(index)} />
            ))}
          </Tabs>
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
        <div className={classes.drawerContainer}>{sidebar}</div>
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
