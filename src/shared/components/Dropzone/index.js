import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import useStyles from './styles';

const propsToAllowOnlyDirectory = {
  webkitdirectory: 'true',
  directory: 'true',
};

const Dropzone = ({ children, allowOnlyDirectory,...restProps }) => {
  const {
    getRootProps,
    getInputProps,
  } = useDropzone(restProps);
  const classes = useStyles();

  const inputProps = {
    ...getInputProps(),
    ...allowOnlyDirectory && propsToAllowOnlyDirectory
  };

  return (
    <div {...getRootProps()} className={classes.root}>
      <input {...inputProps}  />
      {children}
    </div>
  );
};

Dropzone.defaultProps = {
  allowOnlyDirectory: false,
};

Dropzone.propTypes = {
  children: PropTypes.node.isRequired,
  allowOnlyDirectory: PropTypes.bool,
};

export default Dropzone;
