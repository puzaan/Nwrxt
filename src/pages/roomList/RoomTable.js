import { useState } from 'react';

import PropTypes from 'prop-types';
// import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

import { Box, Typography, Stack, Alert, Collapse, AlertTitle, IconButton, Chip } from '@mui/material';
import { useDeleteRoomByIdMutation } from 'store/reducers/room';
import Loder from 'components/Loder/Loder';

export const RoomTable = (props) => {
  const { roomData = [] } = props;
  const [open, setOpen] = useState(true);
  const [deleteRoomById, { isError, isSuccess, error, isLoading }] = useDeleteRoomByIdMutation();

  const deleteRooms = async (id) => {
    if (window.confirm('Are you sure')) {
      await deleteRoomById({
        id: id
      });
    }
  };
  if (isSuccess) {
    window.location.reload();
  }

  if (isError) {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }

  return (
    // <MainCard sx={{ mt: 1, width: 1 }} content={false}>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12} data-aos={'fade-up'} data-aos-delay={100} data-aos-offset={100} data-aos-duration={600}>
        {isError && (
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
                {error.data.message}
                <strong>Try Again!!</strong>
              </Alert>
            </Collapse>
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
      </Grid>

      {roomData.map((item, i) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={i}
          data-aos={'fade-up'}
          data-aos-delay={i * 100}
          data-aos-offset={100}
          data-aos-duration={600}
        >
          <Box display={'block'} width={1} height={1}>
            <Box component={Card} width={1} height={1} display={'flex'} flexDirection={'column'}>
              <CardMedia
                title={item.name}
                image={'https://assets.maccarianagency.com/backgrounds/img31.jpg'}
                sx={{
                  position: 'relative',
                  height: { xs: 240, sm: 340, md: 200 },
                  overflow: 'hidden'
                }}
              >
                <Box display={'flex'} justifyContent={'space-between'} position={'absolute'} bottom={0} padding={2} width={1}>
                  <Box padding={1} bgcolor={'background.paper'} boxShadow={1} borderRadius={2}>
                    <Typography sx={{ fontWeight: 600 }}>Rs: {item.roomprice} / per month</Typography>
                  </Box>
                  <Box boxShadow={1} borderRadius={5}>
                    {item.isBooked && <Chip borderRadius={5} label="Booked" color="success" />}

                    {!item.isBooked && <Chip borderRadius={5} label="Not Booked" color="error" />}
                  </Box>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography variant={'h6'} align={'left'} sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Box display={'flex'} alignItems={'center'} marginY={2}>
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    width={16}
                    height={16}
                    marginRight={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </Box>
                  <Typography variant={'subtitle2'} color="text.secondary">
                    {item.roomTypes}
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    width={16}
                    height={16}
                    marginRight={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </Box>
                  <Typography variant={'subtitle2'} color="text.secondary">
                    {item.floor} Sq Ft
                  </Typography>
                </Box>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button component={Link} to={`/room-update/${item.id}`} variant="outlined">
                    Update
                  </Button>
                  <Button onClick={() => deleteRooms(item.id)}>Delete</Button>
                </CardActions>
              </CardContent>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
    // </MainCard>
  );
};

RoomTable.propTypes = {
  roomData: PropTypes.array
};
