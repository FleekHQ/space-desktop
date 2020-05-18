import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import Button from './index';

const categoryName = 'ElementalComponents';

storiesOf(categoryName, module).add('Button', () => {
  const props = {
    variant: select('variant', ['text', 'contained', 'outlined'], 'text'),
    color: select('color', [undefined, 'accent', 'secondary'], undefined),
    disabled: boolean('disabled', false),
    fixedWidth: boolean('set fixed width(200px as example)?', false) ? 200 : undefined,
    className: 'example-of-class-name',
  };
  console.log(props);
  return <Button {...props}>Some text</Button>;
});
