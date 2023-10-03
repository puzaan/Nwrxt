import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

// material-ui
import { Stack, Typography, Avatar, SvgIcon, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

const RoomCard = ({ count, title, link }) => (
  <MainCard contentSX={{ p: 1.5 }}>
    <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={2}>
      <Stack spacing={2}>
        <Typography color="text.secondary" variant="overline">
          {title}
        </Typography>
        <Typography variant="h5">
          Rooms: <CountUp redraw={false} end={count} start={0} duration={10} />
        </Typography>
      </Stack>
      <Avatar
        sx={{
          backgroundColor: 'error.main',
          height: 56,
          width: 56
        }}
      >
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </SvgIcon>
      </Avatar>
    </Stack>

    <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
      <Button size="small" color={'primary'} variant={'outlined'} component={Link} to={link}>
        View
      </Button>
    </Stack>
  </MainCard>
);

RoomCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  isLoss: PropTypes.bool,
  link: PropTypes.string.isRequired,
  icons: PropTypes.any
};

RoomCard.defaultProps = {
  color: 'primary'
};

export default RoomCard;
