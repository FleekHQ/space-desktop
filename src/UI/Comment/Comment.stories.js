import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { CommentActions, CommentContent, CommentInput } from './index';

const categoryName = 'Comment';

storiesOf(categoryName, module).add('Comment Content', () => {

  const commentContentProps = {
    user: object('user', {
      username: 'Darth Vader',
      imgUrl: 'https://avatarfiles.alphacoders.com/177/thumb-177869.jpg'
    }),
    createdAt: text('createdAt', '2020-06-22T09:51:46.055Z'),
    isExpanded: boolean('isExpanded', false),
    content: text('content', `Everyone
    add comments on this document. loooooooooooooooooooooooooooooooooooooooooooong Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla erat justo, et iaculis urna condimentum ut. Proin pretium nibh et luctus mollis. Maecenas sit amet lacus magna. Maecenas dapibus, nibh eu ultricies laoreet, purus nunc posuere sapien, et egestas augue nulla nec massa. Pellentesque tempor massa sed ipsum vehicula, a volutpat leo consequat. Morbi sollicitudin mi in consectetur molestie. Donec gravida nunc odio, non consequat eros lobortis sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec arcu lacus, aliquet sed felis ac, varius gravida dui. Etiam vitae rhoncus ipsum. Nullam commodo enim ac nisl iaculis, in lobortis ligula commodo. Mauris rhoncus sollicitudin urna eu rutrum. Aenean non rutrum nisl. Praesent sit amet vestibulum dolor. Etiam elementum ornare nulla eu auctor.
    Will make edits.`),
  };


  return (
    <div
      style={{
        width: 329,
        backgroundColor: '#fff',
        margin: '200px 0 0 200px',
        padding: '9px 8px',
      }}
    >
      <CommentContent {...commentContentProps} />
    </div>
  );
});


storiesOf(categoryName, module).add('Comment Content with actions', () => {

  const commentContentProps = {
    user: object('user', {
      username: 'Darth Vader',
      imgUrl: 'https://avatarfiles.alphacoders.com/177/thumb-177869.jpg'
    }),
    createdAt: text('createdAt', '2020-06-22T09:51:46.055Z'),
    isExpanded: boolean('isExpanded', false),
    content: text('content', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla erat justo, et iaculis urna condimentum ut.'),
  };
  const commentActionsProps = {
    i18n: object('actions i18n', {
      edit: 'Edit',
      delete: 'Delete',
    }),
    onEdit: action('onEdit'),
    onRemove: action('onRemove'),
  };

  return (
    <div
      style={{
        width: 329,
        backgroundColor: '#fff',
        margin: '200px 0 0 200px',
        padding: '9px 8px',
      }}
    >
      <CommentContent {...commentContentProps}>
        <CommentActions {...commentActionsProps} />
      </CommentContent>
    </div>
  );
});


storiesOf(categoryName, module).add('Comment Input', () => {
  const commentInputProps = {
    user: object('user', {
      username: 'Darth Vader',
      imgUrl: 'https://avatarfiles.alphacoders.com/177/thumb-177869.jpg'
    }),
    i18n: object('input i18n', {
      placeholder: 'Reply',
      confirm: 'Post',
      cancel: 'Cancel',
      emojiSelectorPlaceholder: 'Select Emoji',
    }),
    confirm: action('confirm'),
  };

  return (
    <div
      style={{
        width: 329,
        backgroundColor: '#fff',
        margin: '200px 0 0 200px',
        padding: '9px 8px',
      }}
    >
      <CommentInput {...commentInputProps} />
    </div>
  );
});
