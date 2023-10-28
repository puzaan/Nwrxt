import { useNavigate } from 'react-router-dom';

import { FormControlLabel, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

export const EditDetail = ({ index }) => {
  const navigate = useNavigate();
  console.log(index);
  const handleEditClick = (id) => {
    if (window.confirm('Are you sure' + id)) {
      console.log(id);
      navigate('/', { replace: true });
    }
  };

  EditDetail.propTypes = {
    index: PropTypes.any
  };
  return (
    <FormControlLabel
      control={
        <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleEditClick(index)}>
          <EditIcon />
        </IconButton>
      }
    />
  );
};