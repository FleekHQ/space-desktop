import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  itemWrapper: {
    padding: '10px 11px',
    border: `1px solid ${theme.palette.palette.gray11}`,
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  author: {
    marginTop: 6,
  },
  title: {
    marginBottom: 14,
  },
  btn: {
    padding: 0,
  },
}));
