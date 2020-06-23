import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.palette.gray11}`,
  },
  rootAccent: {
    borderColor: theme.palette.palette.blue1,
  },
  smallBtn: {
    padding: 0,
    fontSize: 12,
    '&:not(:first-child):before': {
      content: '""',
      display: 'inline-block',
      width: 4,
      height: 3,
      background: theme.palette.palette.gray1,
      borderRadius: '50%',
      margin: '4px 5px',
    },
  },
  dangerBtn: {
    color: theme.palette.palette.red,
  },
  btnsGroup: {
    marginTop: 3,
  },
}));
