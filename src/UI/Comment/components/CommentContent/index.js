import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import Avatar from '@ui/Avatar';
import Typography from '@ui/Typography';

import useStyles from './styles';

const CommentContent = ({
  user,
  createdAt,
  content,
  children,
  isExpanded,
}) => {
  const classes = useStyles({ isExpanded });

  return (
    <div className={classes.root}>
      <Avatar
        imgUrl={user.imgUrl}
        username={user.username}
        size={32}
      />
      <div className={classes.mainContent}>
        <Typography weight="medium" className={classes.username}>
          {user.username}
        </Typography>
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

CommentContent.defaultProps = {
  children: null,
  isExpanded: false,
};

CommentContent.propTypes = {
  children: PropTypes.node,
  isExpanded: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentContent;
