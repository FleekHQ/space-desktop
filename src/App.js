import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import createFleekTheme from './theme';
import useStyles from './styles';
import './styles.css';

const theme = createFleekTheme();

function App() {
  const classes = useStyles();
  const isFrameless = window.innerHeight === window.outerHeight;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
          <div className={classes.dragableAera}></div>
          <div className={classes.app}>
          <div className={classes.sidebar}>
            {isFrameless && <div className={classes.sidebarHeader}></div>}
            <div className={classes.sidebarBody}>
              <div className={classes.sidebarSpacesList}>
                <div className={classes.spaceAvatar}></div>
                <div className={classes.spaceAvatar}></div>
                <div className={classes.spaceAvatar}></div>
              </div>
              <div className={classes.sidebarActions}>
                <div className={classes.box}>
                  <Typography className={classes.username}>SyloTeam</Typography>
                  <Typography className={classes.usernick}>@rollsmorr</Typography>
                  <div className={classes.option}>
                    <div className={classes.optionIcon}></div>
                    <Typography className={classes.username}>My Space</Typography>
                  </div>
                  <div className={classes.option}>
                    <div className={classes.optionIcon}></div>
                    <Typography className={classes.username}>Team Space</Typography>
                  </div>
                  <div className={classes.option}>
                    <div className={classes.optionIcon}></div>
                    <Typography className={classes.username}>Shared with me</Typography>
                  </div>
                  <div className={classes.option}>
                    <div className={classes.optionIcon}></div>
                    <Typography className={classes.username}>Trash</Typography>
                  </div>
                </div>
                <div className={`${classes.box} ${classes.topBorder}`}>
                  <div className={classes.option}>
                    <div className={classes.optionIcon}></div>
                    <Typography className={classes.username}>Backup</Typography>
                  </div>
                  <div className={classes.subBox}>
                    <div className={classes.onOffBox}></div>
                    <Typography className={classes.smallText}>6.6 GB of 15 GB used</Typography>
                    <Typography className={classes.smallText}>Upgrade plan</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.content}></div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
