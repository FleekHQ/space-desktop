import text from '../palette/text';
import error from '../palette/error';
import primary from '../palette/primary';
import palette from '../palette/palette';

const muiButton = {
  root: {
    padding: '8px 20px',
    whiteSpace: 'nowrap',
  },
  contained: {
    '&$disabled': {
      color: '#7b7b7b',
      backgroundColor: palette.veryLightPink,
    },
  },
  outlinedSecondary: {
    color: error.main,
    border: `solid 1px ${error.main}`,
    '&:hover': {
      borderColor: error.extraDark,
      color: error.extraDark,
    },
  },
  sizeLarge: {
    height: 52,
    fontSize: 14,
  },
  containedSecondary: {
    color: palette.whiteThree,
    backgroundColor: error.main,
    '&:hover': {
      backgroundColor: error.extraDark,
    },
  },
  outlined: {
    color: text.secondary,
    border: `solid 1px ${palette.grey6}`,
  },
  textSecondary: {
    color: error.main,
    '&:hover': {
      backgroundColor: palette.grey3,
    },
  },
  containedPrimary: {
    '&&&:hover': {
      backgroundColor: primary.main,
      opacity: 0.8,
      transition: 'all 0.2s ease',
    },
    '&$disabled': {
      color: '#7b7b7b',
      backgroundColor: palette.veryLightPink,
    },
  },
};

export default muiButton;
