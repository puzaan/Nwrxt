import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Delete } from './Delete';
import { EditDetail } from './EditDetail';
import { Scrollbar } from 'utils/Scrollbar';
import MainCard from 'components/MainCard';
import { Avatar, Box, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';

export const RoomTable = (props) => {
  const { count = 0, items = [], onPageChange = () => {}, onRowsPerPageChange, page = 0, rowsPerPage = 0, selected = [] } = props;

  return (
    <MainCard sx={{ mt: 1, width: 1 }} content={false}>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Signed Up</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={customer.avatar}>{customer.name}</Avatar>
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {customer.address.city}, {customer.address.state}, {customer.address.country}
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <div className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer', padding: 1 }}>
                        <EditDetail index={customer.id} />
                        <Delete index={customer.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </MainCard>
  );
};

RoomTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
