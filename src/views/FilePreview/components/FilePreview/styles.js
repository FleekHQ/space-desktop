import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    padding: 20,
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 11,
    width: 413,
    height: 541,
    backgroundColor: theme.palette.palette.gray2,
  },
}));
