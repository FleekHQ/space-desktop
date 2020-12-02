import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 60,
  },
  autocomplete: {
    '& > div > div > div': {
      borderRadius: 3,
      '& label': {
        backgroundColor: theme.palette.palette.white,
        padding: '0 5px',
      },
      '&:focus-within': {
        boxShadow: '0 0 11px #DBE1ED9A',
      },
    },
    '&&&  div': {
      paddingRight: 0,
    },
  },
  option: {
    display: 'flex',
    '&[data-focus="true"]': {
      backgroundColor: '#F5F6F8',
    },
    '&&& p': {
      textOverflow: 'ellipsis',
      display: 'inline-block',
      overflow: 'hidden',
      width: 215,
    },
  },
  permissionDropdown: {
    minWidth: 70,
  },
  chipIcon: {
    color: theme.palette.palette.black,
    fontSize: 10,
  },
  chip: {
    height: 20,
    borderRadius: 0,
    backgroundColor: theme.palette.palette.gray13,
  },
  chipLabel: {
    paddingLeft: 5,
  },
  input: {
    color: theme.palette.palette.black,
    backgroundColor: theme.palette.palette.white,
    borderRadius: 2,
    width: 'calc(100% - 2px)',
    '&&': {
      padding: 0,
      paddingRight: '9px!important',
      paddingLeft: '9px!important',
    },
    '& input::placeholder': {
      color: theme.palette.text.secondary,
      fontWeight: 400,
      opacity: 1,
    },
  },
  paper: {
    border: '1px solid #F2F3F7',
    boxShadow: '0 0 11px #DBE1ED9A',
    margin: '7px -2px',
  },
  inputRoot: {
    '& input': {
      padding: '8px 4px',
    },
  },
}));
