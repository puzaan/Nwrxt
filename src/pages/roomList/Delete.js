import { FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
// import { useDeleteRoomByIdMutation } from 'store/reducers/room';

export const Delete = (index) => {
  // const [deleteRoomByid, isSuccess] = useDeleteRoomByIdMutation();
  const handleDeleteClick = async (index) => {
    // if (window.confirm('Are you sure' + id)) {
    //   try {
    //     const remove = await deleteProducts({
    //       id: id
    //     }).unwrap();
    //     toast.success('successfully deleted');
    //   } catch (err) {
    //     toast.error(err.message);
    //   }
    //   console.log(id);
    // }
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
