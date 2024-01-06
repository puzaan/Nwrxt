import React, { useState, useEffect } from 'react';
// MUI
import {
  Grid,
  Typography,
  Box,
  DialogTitle,
  Snackbar,
  Slide,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  AlertTitle
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
//Third Party
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

//Project Import
import { useCreateHouseServiceMutation } from 'store/reducers/house';
import Loder from 'components/Loder/Loder';
import MainCard from 'components/MainCard';
import OrdersTable from './ServiceTable';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Services() {
  const [snackbar, setSnackbar] = useState(false);
  const [createHouseService, { isLoading, isError, error, isSuccess }] = useCreateHouseServiceMutation();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };
  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  const ServiceCreateSchema = Yup.object().shape({
    houseServiceType: Yup.string().required('House Service Type is required'),
    price: Yup.number().required('House Service Price is required')
  });

  const formik = useFormik({
    initialValues: {
      houseServiceType: '',
      price: 0
    },
    validationSchema: ServiceCreateSchema,
    onSubmit: async () => {
      const savedata = {
        houseServiceType: formik.values.houseServiceType,
        price: formik.values.price
      };
      try {
        await createHouseService({ body: savedata });
        if (isSuccess) {
          handleClose();
          setSnackbar(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

  if (isError) {
    console.log(error.data);
  }

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      setSnackbar(true);
      window.location.reload();
    }
  }, [isSuccess]);
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Grid container spacing={2}>
      <Grid container xs={12} md={12} lg={12}>
        <Grid item xs={12} sx={{ marginTop: { lg: 6, md: 5, sx: 20 } }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Service List</Typography>
            <Button size="small" color={'primary'} variant={'outlined'} startIcon={<AddIcon />} onClick={handleClickOpen}>
              Add Service
            </Button>
          </Grid>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 1, width: 1 }} content={false}>
        <OrdersTable />
      </MainCard>

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
                  {error.data.data}
                  <strong>Try Again!!</strong>
                </Alert>
              </Stack>
            )}
            <Form autoComplete="off" noValidateon Submit={handleSubmit}>
              <Stack spacing={3} marginTop={2}>
                <Stack>
                  <TextField
                    fullWidth
                    label="House Service"
                    {...getFieldProps('houseServiceType')}
                    error={Boolean(touched.houseServiceType && errors.houseServiceType)}
                    helperText={touched.houseServiceType && errors.houseServiceType}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label=" Price"
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
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
          {'Successfully House Service Created!'}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Services;
