import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  app: {
    display: 'flex',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 210,
    boxShadow: '3px -1px 6px 0 rgba(219, 225, 237, 0.25)',
    zIndex: 1,
    background: '#fff',
  },
  sidebarHeader: {
    height: 36,
  },
  sidebarSpacesList: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderTop: '1px solid black',
    borderRight: '1px solid black',
  },
  spaceAvatar: {
    width: 25,
    height: 25,
    borderRadius: 3,
    border: 'solid 2px #030303',
    background: '#666666',
    marginBottom: 12,
  },
  sidebarBody: {
    display: 'flex',
    flexGrow: 1,
  },
  box: {
    padding: '10px 10px 6px',
    borderTop: '1px solid black',
  },
  username: {
    fontSize: 14,
    lineHeight: '15px',
  },
  usernick: {
    fontSize: 12,
    lineHeight: '15px',
    margin: '2px 0 10px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 11,
  },
  optionIcon: {
    width: 14,
    height: 14,
    background: '#666',
    marginRight: 5,
  },
  onOffBox: {
    width: 68,
    height: 19,
    background: '#666',
    margin: '7px 0 4px',
  },
  subBox: {
    paddingLeft: 19,
  },
  smallText: {
    fontSize: 10,
    lineHeight: '15px',
    marginBottom: 1,
  },
  content: {
    background: '#fcfcfc',
  },
  sidebarActions: {
    flexGrow: 1,
  }
});
