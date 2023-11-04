import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useGetAllHouseServicesQuery, useDeleteHouseServiceByIdMutation } from 'store/reducers/house';
import Loder from 'components/Loder/Loder';

// material-ui
import {
  Box,
  Collapse,
  Alert,
  AlertTitle,
  IconButton,
  Link,
  Stack,
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(trackingNo, name, fat, carbs, protein) {
  return { trackingNo, name, fat, carbs, protein };
}

const rows = [
  createData(84564564, 'Camera Lens', 40, 1, 40570),
  createData(98764564, 'Laptop', 300, 0, 180139),
  createData(98756325, 'Mobile', 355, 0, 90989),
  createData(98652366, 'Handset', 50, 1, 10239),
  createData(13286564, 'Computer Accessories', 100, 1, 83348),
  createData(86739658, 'TV', 99, 0, 410780),
  createData(13256498, 'Keyboard', 125, 0, 70999),
  createData(98753263, 'Mouse', 89, 1, 10570),
  createData(98753275, 'Desktop', 185, 1, 98063),
  createData(98753291, 'Chair', 100, 0, 14001)
];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'Id'
  },
  {
    id: 'houseServiceType',
    align: 'left',
    disablePadding: true,
    label: 'Service Type'
  },
  {
    id: 'price',
    align: 'right',
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },

  {
    id: 'action',
    align: 'right',
    disablePadding: false,
    label: 'Action'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const AvilableStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'error';
      title = 'Not-Avilable';
      break;
    case 1:
      color = 'success';
      title = 'Avilable';
      break;
    case 2:
      color = 'warning';
      title = 'Pending';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

AvilableStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

const MatUpdate = ({ id }) => {
  const handleUpdateClick = () => {
    console.log('update' + id);
  };

  return (
    <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleUpdateClick()}>
      <CreateIcon />
    </IconButton>
  );
};
MatUpdate.propTypes = {
  id: PropTypes.number
};

export default function ServiceTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [open, setOpen] = useState(true);

  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);

  const { data, isLoading, isError, error, isSuccess } = useGetAllHouseServicesQuery();

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const [deleteHouseServiceByid, { isError: serviceIsError, error: serviceError, isSuccess: serviceIsSuccess }] =
    useDeleteHouseServiceByIdMutation();

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure')) {
      await deleteHouseServiceByid({
        id: id
      });
    }
  };

  if (serviceIsSuccess) {
    window.location.reload();
  }
  if (serviceIsError) {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }

  return (
    <Box>
      {serviceIsError && (
        <Stack sx={{ width: '100%', marginBottom: 4 }} spacing={2}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              {serviceError.data.message}
              <strong>Try Again!!</strong>
            </Alert>
          </Collapse>
        </Stack>
      )}
      {isError && (
        <Stack sx={{ width: '100%', marginBottom: 4 }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.data.message}
            <strong>Try Again!!</strong>
          </Alert>
        </Stack>
      )}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 3
          }}
        >
          <Loder type="spin" color="#00BFFF" width="15%" height="2%" />
        </Box>
      )}
      {isSuccess && (
        <>
          <TableContainer
            sx={{
              width: '100%',
              overflowX: 'auto',
              position: 'relative',
              display: 'block',
              maxWidth: '100%',
              '& td, & th': { whiteSpace: 'nowrap' }
            }}
          >
            <Table
              aria-labelledby="tableTitle"
              sx={{
                '& .MuiTableCell-root:first-of-type': {
                  pl: 2
                },
                '& .MuiTableCell-root:last-of-type': {
                  pr: 3
                }
              }}
            >
              <OrderTableHead order={order} orderBy={orderBy} />
              <TableBody>
                {data.data.slice(pg * rpg, pg * rpg + rpg).map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" align="left">
                        <Link color="secondary" component={RouterLink} to="">
                          {row.id}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{row.houseServiceType}</TableCell>
                      <TableCell align="right">
                        <NumberFormat value={row.price} displayType="text" thousandSeparator prefix="$" />
                      </TableCell>
                      <TableCell align="left">
                        <AvilableStatus status={row.carbs} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleDeleteClick(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <MatUpdate id={row.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
}
