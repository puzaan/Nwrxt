import PropTypes from 'prop-types';

import ReactLoading from 'react-loading';

const Loder = ({ type, color, width, height }) => <ReactLoading type={type} color={color} height={height} width={width} />;

Loder.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};
Loder.DefaultProps = {
  type: 'spin',
  color: '#00BFFF',
  width: '15%',
  height: '2%'
};
export default Loder;
