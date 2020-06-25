import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  btn: {
    padding: '8px 13px',
    '&:not(:first-child)': {
      marginLeft: 7,
    },
  },
  arrowIcon: {
    fontSize: 11,
    marginTop: 1,
    marginLeft: 5,
  },
  inputWrapper: {
    border: `1px solid ${theme.palette.palette.gray2}`,
    marginTop: 15,
  },
  divider: {
    borderTop: `1px solid ${theme.palette.palette.gray5}`,
    margin: '0 3px',
  },
  sectionWrapper: {
    padding: '15px 24px',
  },
}));
