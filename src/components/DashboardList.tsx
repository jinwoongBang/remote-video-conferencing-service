import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  no: number,
  lectureRoom: string,
  lectureRoomCode: string,
  roomCount: string,
  userCount: string,
  eventManagerCount: number,
  dateOfCreated: number,
) {
  return {
    no,
    lectureRoom,
    lectureRoomCode,
    roomCount,
    userCount,
    eventManagerCount,
    dateOfCreated,
  };
}

const rows = [
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
  createData(1, '강의실 1', 'LECTURE_ROOM_1', '1 / 1', '0 / 4', 0, 20201010),
];

export default function DashboardList() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell align="center">강의실</TableCell>
            <TableCell align="center">강의실 코드</TableCell>
            <TableCell align="center">Open / Total</TableCell>
            <TableCell align="center">접속 인원 / 총 인원</TableCell>
            <TableCell align="center">이벤트 관리자</TableCell>
            <TableCell align="center">이벤트 등록일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row.lectureRoom}_${index}`} hover>
              <TableCell component="th" scope="row">
                {row.no}
              </TableCell>
              <TableCell align="center">{row.lectureRoom}</TableCell>
              <TableCell align="center">{row.lectureRoomCode}</TableCell>
              <TableCell align="center">{row.roomCount}</TableCell>
              <TableCell align="center">{row.userCount}</TableCell>
              <TableCell align="center">{row.eventManagerCount}</TableCell>
              <TableCell align="center">{row.dateOfCreated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
