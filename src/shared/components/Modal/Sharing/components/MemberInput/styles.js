import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 60,
  },
  autocomplete: {
    margin: '0 18px',
    '&&&  div': {
      paddingRight: 0,
    },
  },
  option: {
    display: 'flex',
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
  shareVia: {
    margin: '11px 0px 0px 25px',
    fontSize: 14,
    fontWeight: 500,
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
}));
