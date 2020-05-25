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
  differentBackground: {
    backgroundColor: theme.palette.palette.gray5,
  },
  navWrapper: {
    display: 'flex',
  },
  navColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  specificNavWrapper: {
    padding: '15px 13px 14px 12px',
  },
  specificNavTitle: {
    marginBottom: 14,
  },
  specificNavLink: {
    marginBottom: 10,
  },
  pullDown: {
    marginTop: 'auto',
  },
}));
