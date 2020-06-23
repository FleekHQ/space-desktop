import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    padding: '9px 8px',
  },
  btn: {
    padding: 0,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  mainContent: {
    flexGrow: 1,
    marginLeft: 10,
  },
  content: {
    margin: '4px 0 3px',
  },
});
