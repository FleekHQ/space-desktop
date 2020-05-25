import React from 'react';
import Sidebar from '../../../components/Sidebar';
import useStyles from './styles';

const SidebarsWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div>
        {children}
      </div>
      <div>
        Right panel, with files/folders details
        + check if user is authorized (already setup the app config)
      </div>
    </div>
  );
};

export default SidebarsWrapper;
