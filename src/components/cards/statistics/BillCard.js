import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

// material-ui
import { Stack, Typography, Avatar, SvgIcon, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

const BillCard = ({ count, title, link }) => (
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
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
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

BillCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isLoss: PropTypes.bool,
  link: PropTypes.string.isRequired,
  icons: PropTypes.any
};

BillCard.defaultProps = {
  color: 'primary'
};

export default BillCard;
