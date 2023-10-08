import React from 'react';
import { useState } from 'react';

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
  Slide
} from '@mui/material';
import Alert from '@mui/material/Alert';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Loder from 'components/Loder/Loder';
// import CreateRoom from './CreateRoom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Header = () => {
  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Enter your name'),
    address: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Address is required'),
    emailId: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    gender: Yup.string().required('Please select your gender'),
    contactNumber: Yup.string().required('Enter your contact Number')
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailId: '',
      password: '',
      contactNumber: '',
      gender: '',
      address: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      // dispatch(
      //   CreateAdmin(
      //     formik.values.fullName,
      //     formik.values.gender,
      //     formik.values.address,
      //     formik.values.contactNumber,
      //     formik.values.emailId,
      //     formik.values.password
      //   )
      // );
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack direction="row" justifyContent="space-between" spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Rooms</Typography>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
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
          <Typography variant="h3" align="center">
            Create Room
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
          <FormikProvider value={formik}>
            {/* {error && ( */}
            <Stack sx={{ width: '100%', marginBottom: 4 }} spacing={2}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                error
                <strong>Try Again!!</strong>
              </Alert>
            </Stack>
            {/* )} */}
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    autoComplete="username"
                    label="Full Name"
                    {...getFieldProps('fullName')}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />

                  <TextField
                    select
                    label="Select gender"
                    variant="outlined"
                    name={'gender'}
                    fullWidth
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={Boolean(touched.gender && errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >
                    {['MALE', 'FEMALE', 'OTHER'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email address"
                    {...getFieldProps('emailId')}
                    error={Boolean(touched.emailId && errors.emailId)}
                    helperText={touched.emailId && errors.emailId}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Stack>
                {/* {loading && ( */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 3
                  }}
                >
                  <Loder type="spin" color="#00BFFF" width="15%" height="2%" />
                </Box>
                {/* )} */}

                {/* <LoadingButton size="mideum" type="submit" variant="contained">
                  Create
                </LoadingButton> */}
                {/* <Button>Agree</Button>
                <Button onClick={handleClose}>Disagree</Button> */}
              </Stack>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button type="submit">Agree</Button>
              </DialogActions>
            </Form>
          </FormikProvider>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </Stack>
  );
};
