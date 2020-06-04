import React from 'react';
import PropTypes from 'prop-types';
import { faStar } from '@fortawesome/pro-regular-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import useStyles from './styles';

const StarCheckbox = (props) => {
  const {
    onClick,
    active,
  } = props;

  const classes = useStyles(props);

  return (
    <FontAwesomeIcon
      className={classnames(classes.star, {
        [classes.active]: active,
      })}
      icon={faStar}
      onClick={onClick}
    />
  );
};

StarCheckbox.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default StarCheckbox;
