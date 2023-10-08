import { FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

export const Delete = ({ index }) => {
  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure')) {
      console.log(id);
    }
  };

  return (
    <FormControlLabel
      control={
        <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleDeleteClick(index)}>
          <DeleteIcon />
        </IconButton>
      }
    />
  );
};

Delete.propTypes = {
  index: PropTypes.any
};
