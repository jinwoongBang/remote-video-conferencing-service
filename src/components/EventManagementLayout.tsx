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
import EventVO from 'src/vo/EventVO';

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
  eventVO: EventVO | null;
};

type SubHeader = {
  label: string;
  url: string;
};

const subHeaderList: SubHeader[] = [
  {
    label: '기본정보',
    url: '/',
  },
  {
    label: 'ROOM',
    url: '/preference',
  },
  {
    label: 'E-BOOTH',
    url: '/user',
  },
  {
    label: '스폰서',
    url: '/event',
  },
  {
    label: '포스터',
    url: '/special',
  },
  {
    label: 'VOD',
    url: '/special',
  },
  {
    label: '온라인광고',
    url: '/special',
  },
  {
    label: '이용약관',
    url: '/special',
  },
  {
    label: '공지사항',
    url: '/special',
  },
  {
    label: '긴급공지사항',
    url: '/special',
  },
  {
    label: '소개글',
    url: '/special',
  },
  {
    label: '기프티콘',
    url: '/special',
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
  <Tabs
    {...props}
    variant="scrollable"
    scrollButtons="auto"
    TabIndicatorProps={{ children: <span /> }}
  />
));

function EventManagementLayout({ children, eventVO }: ApoLayoutProps) {
  const classes = useStyles();
  const router = useRouter();
  const { auth } = useAuth();

  const [value, setValue] = useState<number>(0);

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
  }, [router, router.pathname]);

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
          <Grid container justifyContent="space-between">
            <Grid item xs={6} className={classes.logoContainer}>
              <Typography variant="body1">
                {eventVO?.TITLE} ({eventVO?.CODE})
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.rightContainer}>
              {/* <Typography variant="body1">{auth.user?.NAME}</Typography>
              <Typography variant="body2">님 께서 로그인하셨습니다.</Typography> */}
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                창 닫기
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

      <main className={classes.main}>
        <Toolbar />
        <Toolbar variant="dense" />
        <Container maxWidth="lg" disableGutters className={classes.content}>
          {auth.isLoggedIn && children}
        </Container>
      </main>
    </div>
  );
}

export default EventManagementLayout;
