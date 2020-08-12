import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@ui/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons/faArrowCircleUp';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import useStyles from './styles';

const getIconByType = (type) => {
  const icons = {
    info: faInfoCircle,
    upgrade: faArrowCircleUp,
    danger: faExclamationCircle,
  };

  return icons[type] || icons.info;
};

/* eslint-disable react/jsx-props-no-spreading */
const MessageBox = (props) => {
  const {
    type,
    title,
    bgColor,
    children,
    className,
    ...restProps
  } = props;

  const classes = useStyles({ type, bgColor });

  const icon = getIconByType(type);

  return (
    <div
      className={classnames(
        classes.root,
        className,
      )}
      {...restProps}
    >
      <div className={classes.titleContainer}>
        <FontAwesomeIcon
          icon={icon}
          className={classes.icon}
        />
        {typeof title === 'string' ? (
          <Typography variant="body2" weight="medium">
            {title}
          </Typography>
        ) : title}
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

MessageBox.defaultProps = {
  title: null,
  type: 'info',
  bgColor: null,
  children: null,
  className: null,
};

MessageBox.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  bgColor: PropTypes.oneOf(['primary', 'secondary']),
  type: PropTypes.oneOf(['info', 'danger', 'upgrade']),
};

export default MessageBox;
