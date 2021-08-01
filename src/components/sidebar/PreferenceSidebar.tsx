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
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Inbox, Mail } from '@material-ui/icons';

import { PreferencePath } from 'src/common/path';

import StyledListItem from 'src/components/sidebar/StyledListItem';

export default function PreferenceSidebar() {
  return (
    <>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            환경설정
          </ListSubheader>
        }
      >
        <StyledListItem pathname={PreferencePath.root}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="사이트 정보 관리" />
        </StyledListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            운영자 관리
          </ListSubheader>
        }
      >
        <StyledListItem pathname={PreferencePath.operatorList}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="운영자 목록" />
        </StyledListItem>
        <StyledListItem pathname={PreferencePath.operatorRegistration}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="운영자 등록" />
        </StyledListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            이벤트 관리자 관리
          </ListSubheader>
        }
      >
        <StyledListItem pathname={PreferencePath.eventManagerList}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="이벤트 관리자 목록" />
        </StyledListItem>
        <StyledListItem pathname={PreferencePath.eventManagerRegistration}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="이벤트 관리자 등록" />
        </StyledListItem>
      </List>
    </>
  );
}
