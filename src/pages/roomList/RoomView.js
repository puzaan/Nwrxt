import React from 'react';

import { Grid } from '@mui/material';

import { Header } from './Header';
import MainCard from 'components/MainCard';
import RoomTable from './RoomTable';
import { SearchBox } from './SearchBox';

const RoomView = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={12} lg={12} sx={{ mb: -2.25 }}>
        <Header />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <SearchBox />
        <MainCard sx={{ mt: 1 }}>
          <RoomTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default RoomView;
