import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  colorBorder: {
    borderRadius: 6,
    padding: 4,
    // eslint-disable-next-line max-len
    background: 'transparent linear-gradient(111deg, #ED55EB 0%, #17E0D8 37%, #00FFC2 64%, #FFEC06 100%) 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #00000029',
    marginBottom: 15,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px 40px',
    borderRadius: 4,
    background: theme.palette.palette.white,
    textAlign: 'center',
  },
  logo: {
    height: 41,
  },
  btnRoot: {
    backgroundColor: theme.palette.palette.blue1,
  },
}));
