import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '6px 18px',
  },
  header: {
    display: 'flex',
  },
  forwardButton: {
    margin: '0 18px 0 8px',
  },
  title: {
    margin: '11px 0 13px 0',
  },
  searchField: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.palette.gray1,
  },
}));
