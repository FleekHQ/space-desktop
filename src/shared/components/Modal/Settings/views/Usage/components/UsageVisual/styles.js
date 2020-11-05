import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  infoIcon: {
    fontSize: 13,
    color: theme.palette.text.primary,
  },
  iconBtn: {
    padding: '4px 0 0 6px',
  },
  popperRoot: {
    borderRadius: 4,
    boxShadow: '0 0 6px 0 rgba(219, 225, 237, 0.7)',
    marginTop: 5,
  },
  tooltipRoot: {
    margin: 0,
    maxWidth: 345,
    padding: '10px 12px 11px',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontSize: 12,
    lineHeight: 1.25,
    fontWeight: 400,
  },
  widerTooltip: {
    maxWidth: 410,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  boldText: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'baseline',
    fontWeight: 600,
  },
  accentText: {
    color: theme.palette.palette.blue1,
    marginRight: 4,
  },
  panel: {
    padding: '17px 24px 22px 20px',
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
  pieChartWrapper: {
    padding: '0 0 8px',
    marginLeft: 88,
  },
}));
