import React from 'react';

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
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Inbox, Mail } from '@material-ui/icons';

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
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="사이트 정보 관리" />
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            운영자 관리
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="운영자 목록" />
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            이벤트 관리자 관리
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="이벤트 관리자 목록" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="이벤트 관리자 등록" />
        </ListItem>
      </List>
    </>
  );
}
