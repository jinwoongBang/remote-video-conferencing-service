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

export default function EventSidebar() {
  return (
    <>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            이벤트 관리
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="이벤트 목록" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="이벤트 등록" />
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            출석 관리
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="출석 목록" />
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            테스트 답변 관리
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="답변 목록" />
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            쪽지 관리
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="쪽지 목록" />
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            시청중 VOD 관리
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="시청 VOD 목록" />
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            E-Booth 이력 관리
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="E-Booth 이력" />
        </ListItem>
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Roulette 이력
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Roulette 이력" />
        </ListItem>
      </List>
    </>
  );
}
