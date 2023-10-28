import React from 'react';
import { useState, useEffect } from 'react';

import {
  Stack,
  Typography,
  Button,
  SvgIcon,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  TextField,
  MenuItem,
  AlertTitle,
  Box,
  DialogTitle,
  Slide,
  Snackbar
} from '@mui/material';
import Alert from '@mui/material/Alert';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { useCreateRoomMutation } from 'store/reducers/room';

import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Loder from 'components/Loder/Loder';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Header = () => {
  const [snackbar, setSnackbar] = useState(false);

  const [createRoom, { isLoading, isError, error, isSuccess }] = useCreateRoomMutation();

  // const decimal = /^[-+]?[0-9]+\.[0-9]+$/;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const RegisterSchema = Yup.object().shape({
    roomId: Yup.string().required('Room ID is required'),
    floor: Yup.string().required('Floor is required'),
    roomTypes: Yup.string().required('Room Type is required'),
    roomprice: Yup.number().required('Room Price is required')
  });

  const formik = useFormik({
    initialValues: {
      roomId: '',
      floor: '',
      roomTypes: '',
      roomprice: 0
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const savedata = {
        roomId: formik.values.roomId,
        floor: formik.values.floor,
        roomTypes: formik.values.roomTypes,
        roomprice: formik.values.roomprice
      };
      try {
        await createRoom({ body: savedata });
        if (isSuccess) {
          handleClose();
          setSnackbar(true);
          resetForm();
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
  useEffect(() => {
    if (isSuccess) {
      handleClose();
      setSnackbar(true);
      formik.values.roomId = '';
      formik.values.roomTypes = '';
      formik.values.roomprice = 0;
      formik.values.floor = '';
      window.location.reload();
    }
  }, [isSuccess]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <Stack direction="row" justifyContent="space-between" spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Rooms</Typography>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon fontSize={'small'}>
                <ArrowUpOnSquareIcon />
              </SvgIcon>
            }
          >
            Import
          </Button>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowDownOnSquareIcon />
              </SvgIcon>
            }
          >
            Export
          </Button>
        </Stack>
      </Stack>
      <div>
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          }
          variant="contained"
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        <DialogTitle>
          <Typography align="center">Create Room</Typography>
        </DialogTitle>
        <DialogContent>
          <FormikProvider value={formik}>
            {isError && (
              <Stack sx={{ width: '100%', marginBottom: 4 }} spacing={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error.data}
                  <strong>Try Again!!</strong>
                </Alert>
              </Stack>
            )}
            <Form autoComplete="off" noValidateon Submit={handleSubmit}>
              <Stack spacing={3} marginTop={2}>
                <Stack>
                  <TextField
                    fullWidth
                    label="Room Id"
                    {...getFieldProps('roomId')}
                    error={Boolean(touched.roomId && errors.roomId)}
                    helperText={touched.roomId && errors.roomId}
                  />
                </Stack>
                <TextField
                  select
                  label="Select Floor"
                  variant="outlined"
                  name={'floor'}
                  fullWidth
                  value={formik.values.floor}
                  onChange={formik.handleChange}
                  error={Boolean(touched.floor && errors.floor)}
                  helperText={touched.floor && errors.floor}
                >
                  {['GROUND_FLOOR', 'FIRST_FLOOR', 'SECOND_FLOOR', 'THIRE_FLOOR'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Room Price"
                    {...getFieldProps('roomprice')}
                    error={Boolean(touched.roomprice && errors.roomprice)}
                    helperText={touched.roomprice && errors.roomprice}
                  />
                  <TextField
                    select
                    label="Select Room Type"
                    variant="outlined"
                    name={'roomTypes'}
                    fullWidth
                    value={formik.values.roomTypes}
                    onChange={formik.handleChange}
                    error={Boolean(touched.roomTypes && errors.roomTypes)}
                    helperText={touched.roomTypes && errors.roomTypes}
                  >
                    {['SINGLE_ROOM', 'DOUBLE_ROOM', 'FLATS'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>

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
              </Stack>
              <DialogActions>
                <Button type="submit" variant="contained" color="primary" disable={isLoading}>
                  Create
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
          {'Successfully Room Created!'}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
