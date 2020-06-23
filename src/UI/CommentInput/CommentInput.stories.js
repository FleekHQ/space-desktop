import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import CommentInput from './index';

const categoryName = 'CommentInput';

storiesOf(categoryName, module).add('CommentInput', () => {

  const props = {
    confirm: action('confirm'),
    textFieldProps: {
      onFocus: action('onFocus'),
      onBlur: action('onBlur'),
    },
    user: object('user', {
      username: 'Darth Vader',
      imgUrl: 'https://avatarfiles.alphacoders.com/177/thumb-177869.jpg',
    }),
    i18n:object('i18n', {
      placeholder: 'Enter comment',
      confirm: 'Post',
      cancel: 'Cancel',
      emojiSelectorPlaceholder: 'Select Emoji',
    }),
  };

  return (
    <div
      style={{
        width: 500,
        height: 150,
        padding: 50,
      }}
    >
      <div style={{ border: '1px solid #c4c4c4', borderRadius: 3, }}>
        <CommentInput {...props} />
      </div>
    </div>
  );
});