import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons/faChevronDown';
import { CommentInput } from '@ui/Comment';
import useStyles from './styles';
import Thread from '../Thread';

const CommentsSection = ({
  user,
  members,
  threads,
  createThread,
  onEdit,
  onRemove,
  onAddAnswer,
  resolve,
}) => {
  const [openThreadId, setOpenThreadId] = useState();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <div className={classes.sectionWrapper}>
        <Button variant="contained" className={classes.btn}>
          {t('filePreview.comments.inviteMembers')}
        </Button>
        <Button variant="outlined" className={classes.btn}>
          {t('common.open')}
          <FontAwesomeIcon className={classes.arrowIcon} icon={faChevronDown} />
        </Button>
        <div className={classes.inputWrapper}>
          <CommentInput
            user={user}
            i18n={{
              placeholder: t('filePreview.comments.newThreadPlaceholder'),
              confirm: t('common.post'),
              cancel: t('common.cancel'),
              emojiSelectorPlaceholder: t('common.emojiSelectorPlaceholder'),
            }}
            confirm={createThread}
            textFieldProps={{ onFocus: () => setOpenThreadId() }}
          />
        </div>
      </div>
      <div className={classes.divider} />
      <div className={classes.sectionWrapper}>
        {threads.map((thread) => (
          <Thread
            key={thread.id}
            isOpen={openThreadId === thread.id}
            onEdit={(commentId, newValue) => onEdit(thread.id, commentId, newValue)}
            onRemove={(commentId) => onRemove(thread.id, commentId)}
            onAddAnswer={(newValue) => onAddAnswer(thread.id, newValue)}
            expandThread={setOpenThreadId}
            resolve={resolve}
            members={members}
            thread={thread}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

CommentsSection.propTypes = {
  resolve: PropTypes.func.isRequired,
  createThread: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
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
