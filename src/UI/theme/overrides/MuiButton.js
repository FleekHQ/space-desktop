import palette from '../palette/palette';

const muiButton = {
  root: {
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    minWidth: undefined,
  },
  text: {
    color: palette.primary,
    padding: undefined,
    '&:hover': {
      backgroundColor: palette.hover,
    },
    '&$disabled': {
      backgroundColor: palette.accent,
    },
  },
  contained: {
    color: palette.backgroundPrimary,
    backgroundColor: palette.primary,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '&$disabled': {
      backgroundColor: palette.primaryDisabledLight,
      color: palette.primaryDisabledDark,
    },
  },
  outlined: {
    color: palette.primary,
    padding: undefined,
    '&&, &&:hover': {
      border: 'solid 1px currentColor'
    },
  },
  textPrimary: {
    color: palette.accent,
  },
  containedPrimary: {
    color: palette.backgroundPrimary,
    backgroundColor: palette.accent,
  },
  outlinedPrimary: {
    color: palette.accent,
  },
  textSecondary: {
    color: palette.secondary,
  },
  containedSecondary: {
    color: palette.backgroundPrimary,
  },
  outlinedSecondary: {
    color: palette.secondary,
    '&&, &&:hover': {
      border: `solid 1px ${palette.disabled}`,
    },
  },
};

export default muiButton;
