import palette from '../palette/palette';

const muiButton = {
  root: {
    padding: '8px 20px',
    whiteSpace: 'nowrap',
  },
  text: {
    color: palette.primary,
  },
  contained: {
    color: palette.backgroundPrimary,
    backgroundColor: palette.primary,
  },
  outlined: {
    color: palette.primary,
    border: `solid 1px ${palette.primary}`,
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
    border: `solid 1px ${palette.accent}`,
  },
};

export default muiButton;
