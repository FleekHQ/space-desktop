import palette from '../palette/palette';

const muiButton = {
  root: {
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    minWidth: undefined,
    transition: 'opacity ease 0.2s',
    '&:hover': {
      opacity: 0.75,
      backgroundColor: undefined,
    },
  },
  text: {
    color: palette.primary,
    padding: undefined,
  },
  contained: {
    color: palette.backgroundPrimary,
    backgroundColor: palette.primary,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '&:hover': {
      backgroundColor: undefined,
    },
    '&$disabled': {
      backgroundColor: palette.primaryDisabledLight,
      color: palette.primaryDisabledDark,
    },
  },
  outlined: {
    color: palette.primary,
    padding: undefined,
    '&&, &&:hover': {
      border: 'solid 1px currentColor',
      backgroundColor: 'transparent',
    },
  },
  textPrimary: {
    color: palette.accent,
    '&:hover': {
      backgroundColor: undefined,
    },
  },
  containedPrimary: {
    color: palette.backgroundPrimary,
    backgroundColor: palette.accent,
    '&:hover': {
      backgroundColor: undefined,
    },
  },
  outlinedPrimary: {
    color: palette.accent,
  },
  textSecondary: {
    color: palette.secondary,
    '&:hover': {
      backgroundColor: undefined,
    },
  },
  containedSecondary: {
    color: palette.backgroundPrimary,
    '&:hover': {
      backgroundColor: undefined,
    },
  },
  outlinedSecondary: {
    color: palette.secondary,
    '&&, &&:hover': {
      border: `solid 1px ${palette.disabled}`,
    },
  },
};

export default muiButton;
