import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const FleekTypography = ({ bold, color, children, ...restProps }) => {
  const typographyColor = color === 'accent' ? 'textSecondary' : color;
  return (
    <Typography
      color={typographyColor}
      children={bold
        ? <Box fontWeight="fontWeightMedium">{children}</Box>
        : children}
      {...restProps}
    />
  );
};

FleekTypography.defaultProps = {
  bold: false,
  color: 'primary',
  children: null,
};

FleekTypography.propTypes = {
  bold: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'error']),
  children: PropTypes.node,
};

export default FleekTypography;
