import React, { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Next
 */
import Head from 'next/head';
import Image from 'next/image';
// import Link from 'next/link';
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
  Link,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { NavigateNext } from '@material-ui/icons';

/**
 * recoil
 */
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
  selector,
  atom,
  useRecoilValue,
} from 'recoil';

/**
 * Components
 */
import {
  DashboardSidebar,
  PreferenceSidebar,
  UserSidebar,
  EventSidebar,
  SpecialSidebar,
} from 'src/components/sidebar';
import BreadcrumbsList from 'src/components/Breadcrumbs';

/**
 * Hooks
 */
import useAuth from 'src/common/hooks/useAuth';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

/**
 * store
 */
import { authState, counterState } from 'src/store';

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
  main: {
    flexGrow: 1,
    // border: '1px solid tomato',
    // maxWidth: `calc(100vw - ${drawerWidth}px)`,
    // minWidth: `${1440 - drawerWidth}px`,
  },
  content: {
    padding: '20px',
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
    sidebar: <EventSidebar />,
  },
  {
    label: '특별관리',
    url: '/special',
    sidebar: <SpecialSidebar />,
  },
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: '#ffffff',
    },
  },
})((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

function ApoLayout({ children }: ApoLayoutProps) {
  const classes = useStyles();
  const router = useRouter();
  const { auth } = useAuth({
    redirectTo: router.pathname,
    redirectIfFound: true,
  });

  const [value, setValue] = useState<number>(0);
  const [sidebar, setSidebar] = useState(<DashboardSidebar />);

  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const { pathname } = router;

    let index = 0;
    for (let i = 0; i < subHeaderList.length; i++) {
      const { url } = subHeaderList[i];
      const regex = new RegExp(`^${url}`, 'gi');

      if (regex.test(pathname)) {
        index = i;
      }
    }
    setValue(index);
    setSidebar(subHeaderList[index].sidebar);
  }, [router.pathname]);

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

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await HttpClient.get('/logout');
      const { success, result } = await new OTAResponse(response.data);

      if (success) {
        setAuth((auth) => ({ user: null, isLoggedIn: false }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item xs={6} className={classes.logoContainer}>
              <Typography variant="body1">On The Air 로고</Typography>
            </Grid>
            <Grid item xs={3} className={classes.rightContainer}>
              <Typography variant="body1">{auth.user?.userName}</Typography>
              <Typography variant="body2">님 께서 로그인하셨습니다.</Typography>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider></Divider>
        <Toolbar variant="dense">
          <StyledTabs value={value} onChange={handleChangeTab}>
            {subHeaderList.map((item, index) => (
              <Tab label={item.label} key={item.label} {...a11yProps(index)} />
            ))}
          </StyledTabs>
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

      <main className={classes.main}>
        <Toolbar />
        <Toolbar variant="dense" />
        <Container maxWidth="lg" disableGutters className={classes.content}>
          <BreadcrumbsList />
          {auth.isLoggedIn && children}
        </Container>
      </main>
    </div>
  );
}

export default ApoLayout;
