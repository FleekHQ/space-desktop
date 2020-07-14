import { makeStyles } from '@material-ui/core/styles';

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
    },
  },
  loading: {
    width: 230,
    height: 230,
    display: 'flex',
    justifyContent: 'center',
    margin: '-150px 0 20px 0',
  },
  messageContainer: {
    width: 300,
    padding: 15,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
  },
  orbit: {
    width: 230,
    height: 230,
    position: 'absolute',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #434343',
    animation: '$orbit 12s linear infinite',
  },
  moon: {
    width: 30,
    height: 30,
    position: 'relative',
    top: '-15px',
    left: 'calc(50% - 15px)',
    backgroundColor: '#a2a2a2',
    borderRadius: '50%',
    boxShadow: 'inset -7px -7px 0 #8c8c8c',
    '&:before': {
      content: '""',
      borderRadius: '50%',
      width: 8,
      height: 8,
      backgroundColor: '#949494',
      display: 'inline-block',
      margin: '9px 13px',
    },
    '&:after': {
      content: '""',
      borderRadius: '50%',
      width: 7,
      height: 7,
      backgroundColor: '#949494',
      display: 'block',
      margin: '-24px 4px',
    },
  },
  '@keyframes orbit': {
    to: {
      transform: 'rotate(360deg)',
    },
  },
});
