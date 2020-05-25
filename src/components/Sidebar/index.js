import React from 'react';
import useStyles from './styles';
import IconsNavigation from '@ui/IconsNavigation';
import Typography from '@ui/Typography';

const config = [
  {
    icon: 'files',
    link: '/storage/files',
    subNav: {
      text: 'Files',
      link: '/storage/files',
    }
  }
]

const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.trafficLightsSpot}>empty spot</div>
      <div>Team Selector</div>
      <div className={classes.navWrapper}>
        <div className={`${classes.navColumn} ${classes.differentBackground}`}>
          <IconsNavigation />
          <div>Profile Picture</div>
        </div>
        <div className={`${classes.navColumn} ${classes.specificNavigation}`}>
          <Typography weight="medium" variant="h6">Storage</Typography>
          <Typography weight="medium" variant="h6">Storage</Typography>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;