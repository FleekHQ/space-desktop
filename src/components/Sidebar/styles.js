import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.palette.white,
    '& > *:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.palette.gray4}`,
    }
  },
  trafficLightsSpot: {
    height: 27,
  },
  navWrapper: {
    display: 'flex',
  },
  navColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  specificNavigation: {
    padding: '15px 13px 14px 12px',
  },
  differentBackground: {
    backgroundColor: theme.palette.palette.gray5,
  }
}));
