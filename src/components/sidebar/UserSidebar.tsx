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

function UserSidebar() {
  const router = useRouter();

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          회원 관리
        </ListSubheader>
      }
    >
      <ListItem button
      onClick={() => {
        router.push('/user');
      }}>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="회원 목록" />
      </ListItem>
      <ListItem button
      onClick={() => {
        router.push('/user/registration');
      }}>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="회원 등록" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="회원 일괄 등록 (엑셀)" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="회원 일괄 수정 (엑셀)" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="회원 이력 목록" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="회원 이력 목록 (경과시간)" />
      </ListItem>
    </List>
  );
}

export default UserSidebar;
