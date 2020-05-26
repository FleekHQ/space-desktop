import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: 210,
    height: '100%',
    padding: '13px 20px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.palette.white,
  },
  title: {
    marginBottom: 10,
  },
}));