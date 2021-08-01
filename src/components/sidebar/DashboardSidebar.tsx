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
import { DashboardPath } from 'src/common/path';

function DashboardSidebar() {
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          사이트 현황
        </ListSubheader>
      }
    >
      <StyledListItem pathname={DashboardPath.root}>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="현황판" />
      </StyledListItem>
    </List>
  );
}

export default DashboardSidebar;
