import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    padding: '13px 22px 18px',
  },
  fileIconWrapper: {
    margin: '28px auto 15px',
    position: 'relative',
    height: 120,
  },
  buttonsGroup: {
    display: 'flex',
    '& > *:not(:first-child)': {
      marginLeft: 7,
    },
  },
  openBtn: {
    minWidth: 120,
  },
  menuBtn: {
    fontSize: 18,
    padding: 0,
    flexGrow: 1,
  },
  title: {
    margin: '15px 0',
  },
  arrowIcon: {
    fontSize: 11,
    marginTop: 1,
    marginLeft: 5,
  },
  smallIcon: {
    position: 'absolute',
    width: 71,
  },
});
