import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EmojiSelector from './index';

const categoryName = 'EmojiSelector';

storiesOf(categoryName, module).add('EmojiSelector', () => {

  const props = {
    onSelect: action('onSelect'),
    placeholder: "Select Emoji",
  };

  return (
    <div style={{ marginLeft: 400 }}>
      <EmojiSelector {...props} />
    </div>
  );
});