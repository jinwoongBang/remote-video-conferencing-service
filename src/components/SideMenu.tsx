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

export function DashboardSideMenu() {
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          사이트 현황
        </ListSubheader>
      }
    >
      <ListItem button key="현황판">
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="현황판" />
      </ListItem>
    </List>
  );
}
