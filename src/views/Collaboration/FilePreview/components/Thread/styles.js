import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'block',
    position: 'relative',
    border: `1px solid ${theme.palette.palette.gray11}`,
    borderRadius: 3,
    width: '100%',
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  openThread: {
    borderColor: theme.palette.palette.blue1,
  },
  divider: {
    borderTop: `1px solid ${theme.palette.palette.gray11}`,
  },
  resolveBtn: {
    position: 'absolute',
    top: 9,
    right: 8,
    padding: 0,
    transition: 'color 0.2s ease',
    '&:hover': {
      color: theme.palette.palette.blue1,
      opacity: 1,
    },
  },
  commentWrapper: {
    padding: '9px 8px',
    textAlign: 'initial',
  },
}));
