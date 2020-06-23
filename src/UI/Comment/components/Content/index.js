import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import Avatar from '@ui/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@ui/Typography';

import useStyles from './styles';

const Content = ({
  user,
  i18n,
  createdAt,
  content,
  isRoot,
  children,
  resolve,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        imgUrl={user.imgUrl}
        username={user.username}
        size={32}
      />
      <div className={classes.mainContent}>
        <div className={classes.row}>
          <Typography weight="medium">{user.username}</Typography>
          {isRoot && (
            <Button
              color="secondary"
              className={classes.btn}
              disableRipple
              onClick={resolve}
            >
              {i18n.resolve}
            </Button>
          )}
        </div>
        <Typography variant="body2" color="secondary">
          {moment(createdAt).tz(moment.tz.guess()).fromNow()}
        </Typography>
        <Typography
          variant="body2"
          className={classes.content}
        >
          {content}
        </Typography>
        {children}
      </div>
    </div>
  );
};

Content.defaultProps = {
  children: null,
};

Content.propTypes = {
  createdAt: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  resolve: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.node,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.shape({
    resolve: PropTypes.string.isRequired,
  }).isRequired,
};

export default Content;
