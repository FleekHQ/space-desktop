import React from 'react';
import { storiesOf } from '@storybook/react';

import FileIcon from './index';
import FILE_TYPES from './constants';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('FileIcon', () => {
  const icons = [
    {
      ext: FILE_TYPES.DEFAULT,
    },
    {
      ext: FILE_TYPES.FOLDER,
    },
    {
      ext: FILE_TYPES.PDF,
    },
    {
      ext: FILE_TYPES.ZIP,
    },
    {
      ext: FILE_TYPES.IMAGE,
      src: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    },
    {
      ext: FILE_TYPES.POWERPOINT,
    },
    {
      ext: FILE_TYPES.WORD,
    },
    {
      ext: FILE_TYPES.AUDIO,
    },
    {
      ext: FILE_TYPES.VIDEO,
    },
  ];
  return (
    <div >
      {icons.map(icon => (
        <div style={{ margin: 5 }}>
          <div style={{ display: 'inline-block', height: 50, width: 50 }}>
            <FileIcon {...icon} />
          </div>
        </div>
      ))}
    </div>
  );
});
