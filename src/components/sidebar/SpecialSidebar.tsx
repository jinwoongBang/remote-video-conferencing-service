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

function SpecialSidebar() {
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          이벤트 특별 메뉴
        </ListSubheader>
      }
    >
      <ListItem button>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="kpgp 강의집" />
      </ListItem>
    </List>
  );
}

export default SpecialSidebar;
