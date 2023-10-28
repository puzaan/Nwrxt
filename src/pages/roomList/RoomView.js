// import { useEffect, useState } from 'react';

import { Grid, Alert, Box, AlertTitle, Stack } from '@mui/material';

import { Header } from './Header';
import { RoomTable } from './RoomTable';
import { SearchBox } from './SearchBox';
import { useGetAllRoomsQuery } from 'store/reducers/room';
import Loder from 'components/Loder/Loder';

const RoomView = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetAllRoomsQuery();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={12} lg={12} sx={{ mb: -2.25 }}>
        <Header />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <SearchBox />
      </Grid>
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
        <Grid item xs={12} md={12} lg={12}>
          <RoomTable roomData={data.data} />
        </Grid>
      )}
    </Grid>
  );
};

export default RoomView;
