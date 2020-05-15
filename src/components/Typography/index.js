import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const FleekTypography = ({ bold, color, ...restProps }) => {
  const typographyColor = color === 'accent' ? 'textSecondary' : color;
  const typographyComponent = (
    <Typography
      color="textSecondary"
      {...restProps}
    />
  );

  if (bold) {
    return <Box fontWeight={500}>{typographyComponent}</Box>;
  }
  return typographyComponent;
};

FleekTypography.defaultProps = {
  bold: false,
  color: 'primary'
};

FleekTypography.propTypes = {
  bold: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'error']),
};

export default FleekTypography;
