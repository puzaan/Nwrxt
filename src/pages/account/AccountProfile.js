import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
const user = {
  avatar: '/assets/images/users/avatar-2.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

export const AccountProfile = () => (
  <MainCard>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Avatar
        src={user.avatar}
        sx={{
          height: 80,
          mb: 2,
          width: 80
        }}
      />
      <Typography gutterBottom variant="h5">
        {user.name}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {user.city} {user.country}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {user.timezone}
      </Typography>
    </Box>

    <Divider />
    <Button fullWidth variant="text">
      Upload picture
    </Button>
  </MainCard>
);
