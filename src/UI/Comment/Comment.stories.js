import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Comment from './index';

const categoryName = 'Comment';

storiesOf(categoryName, module).add('Comment', () => {

  const defaultProps = {
    user: object('user', {
      username: 'Darth Vader',
      imgUrl: 'https://avatarfiles.alphacoders.com/177/thumb-177869.jpg'
    }),
    createdAt: text('createdAt', '2020-06-22T09:51:46.055Z'),
    content: text('content', 'Everyone add comments on this document. Will make edits.'),
    i18n: object('i18n', {
      resolve: 'Resolve',
      edit: 'Edit',
      delete: 'Delete',
      reply: 'Reply...',
    }),
    isRoot: boolean('isRoot', false),
    resolved: boolean('resolved', false),
    editable: boolean('editable', false),
    resolve: action('resolve'),
    edit: action('edit'),
    remove: action('remove'),
  };

  return (
    <div
      style={{
        width: 281 + 24 + 24,
        padding: 24,
        backgroundColor: '#fff',
      }}
    >
      <Comment {...defaultProps} />
    </div>
  );
});