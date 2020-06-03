import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconsNavigation from '@ui/IconsNavigation';
import Typography from '@ui/Typography';
import CreateNewButton from '../CreateNewButton';
import TeamSelector from '../TeamSelector';
import useStyles from './styles';
import { useNavigations } from './hooks';

const activeLinkProps = {
  weight: 'medium',
  color: 'textSecondary',
};

const noTopbar = window.innerHeight === window.outerHeight;

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const classes = useStyles({ user });
  const { generalNav, specificNav } = useNavigations();

  return (
    <div className={classes.root}>
      {noTopbar && <div className={classes.trafficLightsSpot} />}
      <TeamSelector
        accountsList={[{
          id: user.username,
          name: user.username,
          membersNumber: 0,
        }]}
        selectedAccountId={user.username}
      />
      <div className={classes.navWrapper}>
        <div className={`${classes.navColumn} ${classes.generalNav}`}>
          <IconsNavigation options={generalNav} />
          <Avatar
            src={user.imgURL}
            alt={user.username}
            className={classes.avatar}
          >
            {user.username[0].toUpperCase()}
          </Avatar>
        </div>
        <div className={`${classes.navColumn} ${classes.specificNavWrapper}`}>
          <Typography
            weight="medium"
            variant="h6"
            className={classes.specificNavTitle}
          >
            {specificNav.title}
          </Typography>
          {specificNav.list.map((navLink) => (
            <Link
              key={navLink.key}
              to={navLink.to}
              className={classes.specificNavLink}
            >
              <Typography
                color="secondary"
                variant="body1"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...navLink.active && activeLinkProps}
              >
                {navLink.text}
              </Typography>
            </Link>
          ))}
          <div className={classes.pullDown}>
            <CreateNewButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
