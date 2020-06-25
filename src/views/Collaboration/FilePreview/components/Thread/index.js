import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CommentInput, CommentContent, CommentActions } from '@ui/Comment';
import useStyles from './styles';

const CommentsSection = ({
  user,
  isOpen,
  thread,
  members,
  resolve,
  onEdit,
  onRemove,
  onAddAnswer,
  expandThread,
}) => {
  const classes = useStyles();
  const [currEditedComment, setCurrentEditedComment] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (currEditedComment && !isOpen) {
      setCurrentEditedComment();
    }
  }, [isOpen]);

  const getCommentComponent = (member, commentDetails) => (
    commentDetails.id === currEditedComment ? (
      <CommentInput
        confirm={(value) => {
          onEdit(commentDetails.id, value);
          setCurrentEditedComment();
        }}
        user={user}
        i18n={{
          placeholder: t('filePreview.comments.editCommentPlaceholder'),
          confirm: t('common.post'),
          cancel: t('common.cancel'),
          emojiSelectorPlaceholder: t('common.emojiSelectorPlaceholder'),
        }}
        textFieldProps={{ autoFocus: true }}
        initialValue={commentDetails.content}
        onCancel={setCurrentEditedComment}
      />
    ) : (
      <div className={classes.commentWrapper}>
        <CommentContent
          user={member}
          content={commentDetails.content}
          createdAt={commentDetails.createdAt}
          isExpanded={false}
        >
          {commentDetails.author === user.id && (
            <CommentActions
              onEdit={() => setCurrentEditedComment(commentDetails.id)}
              onRemove={() => onRemove(commentDetails.id)}
              i18n={{
                edit: t('common.edit'),
                delete: t('common.delete'),
              }}
            />
          )}
        </CommentContent>
      </div>
    )
  );

  if (!isOpen) {
    const firstComment = thread.comments[0];
    return (
      <ButtonBase
        onClick={() => expandThread(thread.id)}
        disableRipple
        className={`${classes.root} ${classes.commentWrapper}`}
      >
        <CommentContent
          user={members.find(({ id }) => firstComment.author === id) || { username: '' }}
          content={firstComment.content}
          createdAt={firstComment.createdAt}
          isExpanded={false}
        />
      </ButtonBase>
    );
  }

  return (
    <div className={`${classes.root} ${classes.openThread}`}>
      {!currEditedComment && (
        <Button
          className={classes.resolveBtn}
          color="secondary"
          disableRipple
          onClick={() => resolve(thread.id)}
        >
          {t('filePreview.comments.resolve')}
        </Button>
      )}
      {thread.comments.map((answer) => (
        <>
          <div className={classes.divider} />
          {getCommentComponent(
            members.find(({ id }) => answer.author === id) || { username: '' },
            answer,
          )}
        </>
      ))}
      <div className={classes.divider} />
      <CommentInput
        confirm={onAddAnswer}
        user={user}
        i18n={{
          placeholder: t('filePreview.comments.commentPlaceholder'),
          confirm: t('common.post'),
          cancel: t('common.cancel'),
          emojiSelectorPlaceholder: t('common.emojiSelectorPlaceholder'),
        }}
        textFieldProps={{ autoFocus: true }}
      />
    </div>
  );
};

CommentsSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  resolve: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,
  expandThread: PropTypes.func.isRequired,
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
  })).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
  }).isRequired,
};


export default CommentsSection;
