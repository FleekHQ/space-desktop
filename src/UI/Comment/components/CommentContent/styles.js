import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
  },
  username: {
    marginBottom: 2,
  },
  mainContent: {
    flexGrow: 1,
    marginLeft: 10,
    minWidth: 0,
  },
  content: {
    display: '-webkit-box',
    '-webkit-line-clamp': ({ isExpanded }) => (isExpanded ? 'initial' : 4),
    '-webkit-box-orient': 'vertical',
    marginTop: 4,
    wordBreak: 'break-word',
    whiteSpace: 'break-spaces',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
