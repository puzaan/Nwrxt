import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import MainCard from 'components/MainCard';
import OrdersTable from './ServiceTable';
// import ComponentSkeleton from '../components-overview/ComponentSkeleton';

function Services() {
  return (
    <Grid container spacing={2}>
      <Grid container xs={12} md={12} lg={12}>
        <Grid item xs={12} sx={{ marginTop: { lg: 6, md: 5, sx: 20 } }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Service List</Typography>
            <Button size="small" color={'primary'} variant={'outlined'} startIcon={<AddIcon />}>
              Add Service
            </Button>
          </Grid>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 1, width: 1 }} content={false}>
        <OrdersTable />
      </MainCard>
    </Grid>
  );
}

export default Services;
