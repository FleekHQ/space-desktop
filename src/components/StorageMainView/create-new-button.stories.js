import React from 'react';
import { storiesOf } from '@storybook/react';

import StorageMainView from './index';

const categoryName = 'StorageMainView';

storiesOf(categoryName, module).add('StorageMainView', () => (
  <div >
    <StorageMainView />
  </div>
));
