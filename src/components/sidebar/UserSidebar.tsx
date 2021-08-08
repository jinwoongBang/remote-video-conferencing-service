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
import StyledListItem from 'src/components/sidebar/StyledListItem';

import { UserPath } from 'src/common/path';

function UserSidebar() {
  const router = useRouter();

  return (
    <>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            회원 관리
          </ListSubheader>
        }
      >
        <StyledListItem pathname={UserPath.root}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="회원 목록" />
        </StyledListItem>

        <StyledListItem pathname={UserPath.registration}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="회원 등록" />
        </StyledListItem>

        <StyledListItem pathname={UserPath.bulkRegistrationExcel}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="회원 일괄 등록 ( 엑셀 ) " />
        </StyledListItem>

        <StyledListItem pathname={UserPath.bulkModifyExcel}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="회원 일괄 수정 ( 엑셀 ) " />
        </StyledListItem>

        <StyledListItem pathname={UserPath.histroyList}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="회원 이력 목록" />
        </StyledListItem>

        <StyledListItem pathname={UserPath.historyElapsedTime}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="회원 이력 목록 ( 경과시간 )" />
        </StyledListItem>
      </List>
    </>
  );
}

export default UserSidebar;
