/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Content from './components/Content';

import useStyles from './styles';

const Comment = ({
  user,
  i18n,
  createdAt,
  content,
  isRoot,
  resolved,
  editable,
  resolve,
  edit,
  remove,
}) => {
  const classes = useStyles();
  const [isShownInput, setIsShownInput] = useState(false);

  const getNonEditablePart = () => {
    if (isShownInput) {
      return <input />;
    }
    return (
      <Button
        color="secondary"
        className={classes.smallBtn}
        disableRipple
        onClick={() => setIsShownInput(true)}
      >
        {i18n.reply}
      </Button>
    );
  };

  return (
    <div
      className={classnames(classes.root, {
        [classes.rootAccent]: isShownInput,
      })}
    >
      <Content
        user={user}
        createdAt={createdAt}
        content={content}
        i18n={i18n}
        isRoot={isRoot}
        resolved={resolved}
        resolve={resolve}
      >
        {!resolved && (
          <div className={classes.btnsGroup}>
            {editable ? (
              <>
                <Button
                  color="primary"
                  className={classes.smallBtn}
                  disableRipple
                >
                  {i18n.edit}
                </Button>
                <Button
                  className={classnames(classes.smallBtn, classes.dangerBtn)}
                  disableRipple
                  onClick={remove}
                >
                  {i18n.delete}
                </Button>
              </>
            ) : getNonEditablePart()}
          </div>
        )}
      </Content>
    </div>
  );
};

// Comment.defaultProps = {
//   isRoot: false,
// };

Comment.propTypes = {
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  resolved: PropTypes.bool.isRequired,
  isRoot: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  resolve: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.shape({
    resolve: PropTypes.string.isRequired,
    edit: PropTypes.string.isRequired,
    delete: PropTypes.string.isRequired,
    reply: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
