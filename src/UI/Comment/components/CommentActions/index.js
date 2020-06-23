import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import useStyles from './styles';

const CommentActions = ({
  i18n,
  onEdit,
  onRemove,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        className={classes.btn}
        onClick={onEdit}
        disableRipple
      >
        {i18n.edit}
      </Button>
      <Button
        className={`${classes.btn} ${classes.dangerBtn}`}
        onClick={onRemove}
        disableRipple
      >
        {i18n.delete}
      </Button>
    </div>
  );
};

CommentActions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    edit: PropTypes.string.isRequired,
    delete: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentActions;
