import React, { useEffect } from 'react';

import { Button, Box, Alert, AlertTitle, Collapse, Stack, IconButton, TextField, Grid, Divider, MenuItem, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import CloseIcon from '@mui/icons-material/Close';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetRoomByIdQuery, useUpdateRoomByIdMutation } from 'store/reducers/room';
import Loder from 'components/Loder/Loder';

const RoomUpdate = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { data, isError: getIsError, isSuccess: getIsSuccess, error: getError, isLoading: getLoading } = useGetRoomByIdQuery(id);
  const [updateRoomById, { isError: updateIsError, error: updateError, isLoading: updateLoading, isSuccess }] = useUpdateRoomByIdMutation();

  useEffect(() => {
    if (getIsError) {
      navigate(-1);
    }
    // eslint-disable-next-line
  }, [getIsError]);
  useEffect(() => {
    if (isSuccess) {
      navigate('/room-view', { replace: true });
    }
  });

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
      roomprice: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const savedata = {
        id: id,
        roomId: formik.values.roomId,
        floor: formik.values.floor,
        roomTypes: formik.values.roomTypes,
        roomprice: formik.values.roomprice
      };
      try {
        await updateRoomById({ body: savedata });
        // navigate(-1);
      } catch (err) {
        console.log(err);
      }
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box>
      <Stack direction="row" spacing={2} size="large" alignItems="center">
        <IconButton component={Link} to="/room-view" aria-label="add to shopping cart" color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom fontWeight={700}>
          Update Room Detail
        </Typography>
      </Stack>
      {/* <Typography variant={'subtitle2'} color={'text.secondary'}>
        Please read our{' '}
        <Link color={'primary'} href={'/company-terms'} underline={'none'}>
          terms of use
        </Link>{' '}
        to be informed how we manage your private data.
      </Typography> */}
      <Box paddingY={4}>
        <Divider />
      </Box>
      <Grid item xs={12} sm={12} md={12} data-aos={'fade-up'} data-aos-delay={100} data-aos-offset={100} data-aos-duration={600}>
        {getIsError && (
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
                {getError.data.message}
                <strong>Try Again!!</strong>
              </Alert>
            </Collapse>
          </Stack>
        )}
        {updateIsError && (
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
                {updateError.data.message}
                <strong>Try Again!!</strong>
              </Alert>
            </Collapse>
          </Stack>
        )}
        {getLoading && (
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
      </Grid>
      {getIsSuccess && (
        <FormikProvider value={formik}>
          <Form autoComplete="off" Submit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }} fontWeight={700}>
                  Change Room Id
                </Typography>
                <TextField
                  label={data.data.roomId}
                  variant="outlined"
                  name={'roomId'}
                  fullWidth
                  {...getFieldProps('roomId')}
                  error={Boolean(touched.roomId && errors.roomId)}
                  helperText={touched.roomId && errors.roomId}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }} fontWeight={700}>
                  Select Floor
                </Typography>
                <TextField
                  select
                  label={data.data.floor}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }} fontWeight={700}>
                  Set Price
                </Typography>
                <TextField
                  variant="outlined"
                  name={'Room Price'}
                  fullWidth
                  type="number"
                  label={data.data.roomprice}
                  {...getFieldProps('roomprice')}
                  error={Boolean(touched.roomprice && errors.roomprice)}
                  helperText={touched.roomprice && errors.roomprice}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }} fontWeight={700}>
                  Room Types
                </Typography>
                <TextField
                  select
                  label={data.data.roomTypes}
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
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'right'}
                  width={1}
                  margin={'0 auto'}
                >
                  <Button size={'large'} variant={'contained'} type={'submit'} disabled={updateLoading}>
                    Update
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      )}
    </Box>
  );
};

export default RoomUpdate;
