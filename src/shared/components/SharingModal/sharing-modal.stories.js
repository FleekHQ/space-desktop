import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, object, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SharingModal from './index';

const categoryName = 'SharingModal';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    filename: text('filename', 'Folder'),
    shareLink: boolean('shareLink', false),
    ext: select('ext', [
      'pdf',
      'zip',
      'jpg',
      'ppt',
      'doc',
      'mp3',
      'mp4',
      'folder',
      'default',
    ], 'folder'),
    onShareLinkClick: action('onShareLinkClick'),
    onChangeUserPermissions: action('onChangeUserPermissions'),
    onChangeInputPermissions: action('onChangeInputPermissions'),
    collaborators: object('collaborators', [
      {
        id: 'morochroyce@gmail.com',
        mainText: 'Peter Adams',
        imageSrc: 'https://cdn.theatlantic.com/thumbor/55coU3IJRzsQ16uvkFvYoLl3Pkc=/200x200/filters:format(png)/media/None/image/original.png',
        permissionsId: 'edit',
        isOwner: true,
      },
      {
        id: 'morochgfx@gmail.com',
        mainText: 'Royce',
        permissionsId: 'edit',
      },
      {
        id: 'maria.mart@gmail.com',
        mainText: 'Maria Martinez',
        imageSrc: 'https://cdn.theatlantic.com/thumbor/55coU3IJRzsQ16uvkFvYoLl3Pkc=/200x200/filters:format(png)/media/None/image/original.png',
        permissionsId: 'edit',
      },
      {
        id: 'lorelipsum.com',
        mainText: 'Lorem ipsum',
        permissionsId: 'edit',
      },
      {
        id: 'asd123@gmail.com',
        mainText: 'asd123',
        permissionsId: 'edit',
      },
      {
        id: 'mon.kallen@gmail.com4',
        mainText: 'Mon Kallen',
        permissionsId: 'edit',
      },
    ]),
  };

  return (
    <div
      style={{
        width: 460,
        height: 420,
        backgroundColor: 'white',
      }}
    >
      <SharingModal {...defaultProps} />
    </div>
  );
});
