import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundImage: 'url(/assets/images/auth_background.svg)',
  },
  form: {
    display: 'inherit',
    flexDirection: 'column',
    '& > *': {
      margin: '12px 0',
    }
  },
  buttonRoot: {
    height: 39,
    borderRadius: 3,
    fontWeight: 600,
  },
  textFieldRoot: {
    '& label.Mui-focused, & label.MuiFormLabel-filled': {
      color: theme.palette.palette.white,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.palette.white,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset, &:hover fieldset': {
        borderColor: theme.palette.palette.gray8,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.palette.white,
      },
    },
    '& label.MuiFormLabel-filled + .MuiOutlinedInput-root': {
      '& fieldset, &:hover fieldset': {
        borderColor: theme.palette.palette.white,
      }
    },
  },
  inputPropsRoot: {
    borderRadius: 3,
  },
  inputPropsInput: {
    height: 39,
    width: 282,
    padding: 11,
    boxSizing: 'border-box',
    color: theme.palette.palette.white,
    backgroundColor: theme.palette.palette.black,
  },
  inputLabelPropsRoot: {
    top: 3,
  },
  inputLabelPropsShrink: {
    top: 0,
  },
}));