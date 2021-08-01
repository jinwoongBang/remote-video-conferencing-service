import React from 'react';
import clsx from 'clsx';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { TableFooter } from '@material-ui/core';

// interface Data {
//   calories: number;
//   carbs: number;
//   fat: number;
//   name: string;
//   protein: number;
//   logCount: number;
//   dateOfCreated: number;
// }

interface OperatorData {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  preference: number;
  user: number;
  event: number;
  special: number;
  logCount: number;
  dateOfCreated: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  preference: number,
  user: number,
  event: number,
  special: number,
  logCount: number,
  dateOfCreated: number,
): OperatorData {
  return {
    name,
    calories,
    fat,
    carbs,
    preference,
    user,
    event,
    special,
    logCount,
    dateOfCreated,
  };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 0, 0, 0, 0, 1000, 20201012),
  createData('Donut', 452, 25.0, 51, 0, 0, 0, 0, 1000, 20201012),
  createData('Eclair', 262, 16.0, 24, 0, 0, 0, 0, 1000, 20201012),
  createData('Frozen yoghurt', 159, 6.0, 24, 0, 0, 0, 0, 1000, 20201012),
  createData('Gingerbread', 356, 16.0, 49, 0, 0, 0, 0, 1000, 20201012),
  createData('Honeycomb', 408, 3.2, 87, 0, 0, 0, 0, 1000, 20201012),
  createData('Ice cream sandwich', 237, 9.0, 37, 0, 0, 0, 0, 1000, 20201012),
  createData('Jelly Bean', 375, 0.0, 94, 0, 0, 0, 0, 1000, 20201012),
  createData('KitKat', 518, 26.0, 65, 0, 0, 0, 0, 1000, 20201012),
  createData('Lollipop', 392, 0.2, 98, 0, 0, 0, 0, 1000, 20201012),
  createData('Marshmallow', 318, 0, 81, 0, 0, 0, 0, 1000, 20201012),
  createData('Nougat', 360, 19.0, 9, 0, 0, 0, 0, 1000, 20201012),
  createData('Oreo', 437, 18.0, 63, 0, 0, 0, 0, 1000, 20201012),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof OperatorData;
  label: string;
  numeric: boolean;
  hasChild: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '번호',
    hasChild: false,
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: '상태',
    hasChild: false,
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: '아이디',
    hasChild: false,
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: '이름',
    hasChild: false,
  },
  {
    id: 'preference',
    numeric: false,
    disablePadding: false,
    label: '관리 권한',
    hasChild: true,
  },
  {
    id: 'logCount',
    numeric: true,
    disablePadding: false,
    label: '로그 횟수',
    hasChild: false,
  },
  {
    id: 'dateOfCreated',
    numeric: true,
    disablePadding: false,
    label: '등록일',
    hasChild: false,
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof OperatorData,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof OperatorData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            rowSpan={headCell.hasChild ? 1 : 2}
            colSpan={headCell.hasChild ? 4 : 0}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell align="left">환경설정</TableCell>
        <TableCell align="left">회원관리</TableCell>
        <TableCell align="left">이벤트관리</TableCell>
        <TableCell align="left">특별관리</TableCell>
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        운영자 목록
      </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

function OperatorListTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof OperatorData>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof OperatorData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //   role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.preference}</TableCell>
                      <TableCell align="center">{row.user}</TableCell>
                      <TableCell align="center">{row.event}</TableCell>
                      <TableCell align="center">{row.special}</TableCell>
                      <TableCell align="center">{row.logCount}</TableCell>
                      <TableCell align="center">{row.dateOfCreated}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
}

export default OperatorListTable;
