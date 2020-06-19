import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@ui/Avatar';
import EmojiSelector from '@ui/EmojiSelector';

import useStyles from './styles';

const CommentInput = ({
  i18n,
  user,
  confirm,
  textFieldProps,
}) => {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const onChangeInput = (event) => {
    setValue(event.target.value);
  };
  const clearInput = () => {
    setValue('');
  };
  const onSelectEmoji = (emoji) => {
    confirm(emoji.native);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    confirm(value);
    clearInput();
  };

  return (
    <div className={classes.root}>
      <Avatar
        imgUrl={user.imgUrl}
        username={user.username}
        size={24}
        className={classes.avatar}
      />
      <form onSubmit={onSubmit} className={classes.form}>
        <InputBase
          value={value}
          onChange={onChangeInput}
          className={classes.input}
          multiline
          rowsMax={5}
          fullWidth
          placeholder={i18n.placeholder}
          inputProps={{ 'aria-label': 'naked' }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...textFieldProps}
        />
        {value && (
          <div className={classes.buttonsWrapper}>
            <Button className={classes.btn} type="submit" variant="contained" color="primary">{i18n.confirm}</Button>
            <Button className={classes.btn} color="secondary" onClick={clearInput}>{i18n.cancel}</Button>
          </div>
        )}
      </form>
      {!value && (
        <div className={classes.emojiWrapper}>
          <EmojiSelector
            onSelect={onSelectEmoji}
            placeholder={i18n.emojiSelectorPlaceholder}
          />
        </div>
      )}
    </div>
  );
};

CommentInput.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  textFieldProps: {},
};

CommentInput.propTypes = {
  confirm: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  textFieldProps: PropTypes.shape({}),
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
  }).isRequired,
  i18n: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    emojiSelectorPlaceholder: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentInput;
