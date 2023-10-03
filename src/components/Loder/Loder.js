import PropTypes from 'prop-types';

import ReactLoading from 'react-loading';

const Loder = ({ type, color, width, height }) => <ReactLoading type={type} color={color} height={height} width={width} />;

Loder.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};
export default Loder;
