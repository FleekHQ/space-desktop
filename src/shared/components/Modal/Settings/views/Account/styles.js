import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: 10,
    },
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #dbdbdb',
    borderTopStyle: 'dashed',
    paddingTop: 18,
  },
  input: {
    display: 'none',
  },
  error: {
    display: 'flex',
    padding: '11px 15px 9px',
    backgroundColor: theme.palette.palette.redLight,
    border: `1px solid ${theme.palette.palette.red}`,
    borderRadius: 4,
  },
  errorIcon: {
    color: theme.palette.palette.red,
    fontSize: 13,
    marginRight: 5,
  },
}));
