import { makeStyles } from '@material-ui/styles';

const { PUBLIC_URL } = process.env;

export default makeStyles({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundImage: `url(${PUBLIC_URL}/assets/images/auth_background.svg)`,
    '& > img': {
      marginBottom: 10,
    }
  },
});
