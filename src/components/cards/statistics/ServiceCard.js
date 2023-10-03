import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

// material-ui
import { Stack, Typography, Avatar, SvgIcon, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets

const ServiceCard = ({ count, title, link }) => (
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
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
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

ServiceCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isLoss: PropTypes.bool,
  link: PropTypes.string.isRequired,
  icons: PropTypes.any
};

ServiceCard.defaultProps = {
  color: 'primary'
};

export default ServiceCard;
