import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import zIndex from './zIndex';
import palette from './palette';
import overrides from './overrides';
import typography from './typography';

const createFleekTheme = () => {
  return createMuiTheme({
    zIndex,
    palette,
    overrides,
    typography,
  });
};

export default createFleekTheme;
