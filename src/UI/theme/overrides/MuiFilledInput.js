import palette from '../palette';

const MuiFilledInput = {
  root: {
    backgroundColor: palette.palette.backgroundPrimary,
    boxShadow: palette.shadows.bottom,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: palette.palette.backgroundPrimary,
    borderRadius: 4,
    transition: 'border-color 0.15s ease',
    '&:hover': {
      backgroundColor: undefined,
    },
    '&$focused': {
      backgroundColor: undefined,
      borderColor: palette.palette.accent,
    }
  },
  input: {
    height: 'auto',
    padding: '7px 15px 9px',
    '&::placeholder': {
      color: palette.palette.secondary,
      opacity: 1,
    },
  },
  underline: {
    display: 'none',
  },
};

export default MuiFilledInput;
