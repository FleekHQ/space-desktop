import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const mapColor = {
  accent: 'primary'
};
const getColor = (color) => (
  mapColor[color] || color
);

const FleekButton = ({ fixedWidth, color, className, ...props }) => {
  const classes = useStyles({ fixedWidth });

  return (
    <Button
      disableElevation
      color={getColor(color)}
      className={classnames(className, classes.root)}
      {...props}
    />
  );
};

FleekButton.defaultProps = {
  fixedWidth: undefined,
  color: undefined,
  className: undefined,
};

FleekButton.propTypes = {
  color: PropTypes.oneOf(['accent', 'secondary']),
  fixedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

export default FleekButton;
