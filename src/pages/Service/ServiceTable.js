import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
  Typography,
  DialogTitle,
  Slide,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  MenuItem,
  Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';

// third-party
import NumberFormat from 'react-number-format';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

// project import
import Dot from 'components/@extended/Dot';
import Loder from 'components/Loder/Loder';
import { useGetAllHouseServicesQuery, useUpdateHouseServiceByIdMutation, useDeleteHouseServiceByIdMutation } from 'store/reducers/house';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const headCells = [
  {
    id: 'id',
    align: 'center',
    disablePadding: false,
    label: 'Id'
  },
  {
    id: 'houseServiceType',
    align: 'center',
    disablePadding: true,
    label: 'Service Type'
  },
  {
    id: 'price',
    align: 'center',
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
    align: 'center',
    disablePadding: false,
    label: 'Action'
  }
];

// ==============================|| Service TABLE - HEADER ||============================== //

function ServiceTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| SERVICE TABLE - STATUS ||============================== //

const AvilableStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case false:
      color = 'error';
      title = 'Not-Avilable';
      break;
    case true:
      color = 'success';
      title = 'Avilable';
      break;
    // case 2:
    //   color = 'warning';
    //   title = 'Pending';
    //   break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center" align="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

AvilableStatus.propTypes = {
  status: PropTypes.bool
};

// ==============================|| ORDER TABLE ||============================== //

// const MatUpdate = ({ id }) => {
//   const handleUpdateClick = () => {
//     console.log('update' + id);
//   };

//   return (
//     <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleUpdateClick()}>
//       <CreateIcon />
//     </IconButton>
//   );
// };
// MatUpdate.propTypes = {
//   id: PropTypes.number
// };

export default function ServiceTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [open, setOpen] = useState(true);

  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState();
  const [isActive, setIsActive] = useState();
  const [id, setId] = useState('');

  //table set value
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);

  //dailog box
  const [dailogOpen, setDailogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const { data, isLoading, isError, error, isSuccess } = useGetAllHouseServicesQuery();
  const [updateHouseServiceById, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess }] =
    useUpdateHouseServiceByIdMutation();
  const [deleteHouseServiceByid, { isError: serviceIsError, error: serviceError, isSuccess: serviceIsSuccess }] =
    useDeleteHouseServiceByIdMutation();
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure')) {
      await deleteHouseServiceByid({
        id: id
      });
    }
  };

  const handleUpdateClick = (row) => {
    setServiceName(row.houseServiceType);
    setPrice(row.price);
    setIsActive(row.isActive);
    setId(row.id);
    setDailogOpen(true);
  };
  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };
  const handleClose = () => {
    formik.resetForm();
    setDailogOpen(false);
  };

  const ServiceUpdateSchema = Yup.object().shape({
    houseServiceType: Yup.string().required(' Service Name is required'),
    price: Yup.number().required('House Service Price is required'),
    isActive: Yup.bool().required('House Service isActive is required')
  });

  const formik = useFormik({
    initialValues: {
      houseServiceType: serviceName,
      price: price,
      isActive: isActive
    },
    validationSchema: ServiceUpdateSchema,
    onSubmit: async () => {
      const savedata = {
        houseServiceType: formik.values.houseServiceType,
        price: formik.values.price,
        id: id,
        isActive: formik.values.isActive
      };
      try {
        await updateHouseServiceById({ body: savedata });
      } catch (err) {
        console.log(err);
      }
    }
  });

  if (isUpdateError) {
    console.log(error.data);
  }

  useEffect(() => {
    if (isUpdateSuccess) {
      handleClose();
      setSnackbar(true);
      window.location.reload();
    }
  }, [isUpdateSuccess]);
  const { errors, touched, handleSubmit, getFieldProps } = formik;

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
              <ServiceTableHead order={order} orderBy={orderBy} />
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
                      <TableCell component="th" id={labelId} scope="row" align="center">
                        <Link color="secondary" component={RouterLink} to="">
                          {row.id}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{row.houseServiceType}</TableCell>
                      <TableCell align="center">
                        <NumberFormat value={row.price} displayType="text" thousandSeparator prefix="RS:" />
                      </TableCell>
                      <TableCell align="center">
                        <AvilableStatus status={row.isActive} />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleDeleteClick(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleUpdateClick(row)}>
                          <CreateIcon />
                        </IconButton>
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
            count={data.data.length}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <Dialog
        open={dailogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        <DialogTitle>
          <Typography align="center">Update Service Detail</Typography>
        </DialogTitle>
        <DialogContent>
          <FormikProvider value={formik}>
            {isUpdateError && (
              <Stack sx={{ width: '100%', marginBottom: 4 }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {updateError.data.data}
                  <strong>Try Again!!</strong>
                </Alert>
              </Stack>
            )}
            <Form autoComplete="off" noValidateon Submit={handleSubmit}>
              <Stack spacing={3} marginTop={2}>
                <Stack>
                  <TextField
                    fullWidth
                    label={serviceName}
                    {...getFieldProps('houseServiceType')}
                    error={Boolean(touched.houseServiceType && errors.houseServiceType)}
                    helperText={touched.houseServiceType && errors.houseServiceType}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label={price}
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Stack>
                <TextField
                  select
                  label={'Service Active :' + isActive}
                  variant="outlined"
                  name={'isActive'}
                  fullWidth
                  value={formik.values.isActive}
                  onChange={formik.handleChange}
                  error={Boolean(touched.isActive && errors.isActive)}
                  helperText={touched.isActive && errors.isActive}
                >
                  {[true, false].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.toString()}
                    </MenuItem>
                  ))}
                  {/* <MenuItem key={'True'} value={true}>
                    {option}
                  </MenuItem>
                  <MenuItem key={'True'} value={true}>
                    {option}
                  </MenuItem> */}
                </TextField>

                {isUpdateLoading && (
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
              </Stack>
              <DialogActions>
                <Button type="submit" variant="contained" color="primary" disable={isLoading}>
                  Update
                </Button>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        key={'bottom' + 'right'}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {'Successfully House Service Created!'}
        </Alert>
      </Snackbar>
    </Box>
  );
}
