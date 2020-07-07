import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.palette.gray5,
  },
  wrapper: {
    flexBasis: 330,
    backgroundColor: theme.palette.palette.white,
  },
}));
