import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

// material-ui
import { Stack, Typography, Avatar, SvgIcon, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets

const UserCard = ({ count, title, link }) => (
  <MainCard contentSX={{ p: 1.5 }}>
    <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={2}>
      <Stack spacing={2}>
        <Typography color="text.secondary" variant="overline">
          {title}
        </Typography>
        <Typography variant="h5">
          <CountUp redraw={false} end={count} start={0} duration={10} />
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
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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

UserCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isLoss: PropTypes.bool,
  link: PropTypes.string.isRequired,
  icons: PropTypes.any
};

UserCard.defaultProps = {
  color: 'primary'
};

export default UserCard;
