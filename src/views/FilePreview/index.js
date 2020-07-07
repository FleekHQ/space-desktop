import React from 'react';
import {
  Link,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import IconsNavigation from '@ui/IconsNavigation';
import FilePreview from './components/FilePreview';
import Comments from './Comments';
import History from './History';
import useStyles from './styles';
import { useNavigation } from './hooks';

const FilePreviewView = () => {
  const navigation = useNavigation();
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilePreview />
      <div className={classes.wrapper}>
        <Switch>
          <Route path={`${match.path}/comments`}>
            <Comments />
          </Route>
          <Route path={`${match.path}/history`}>
            <History />
          </Route>
          <Redirect to={`${match.path}/comments`} />
        </Switch>
      </div>
      <IconsNavigation options={navigation} WrapperComponent={Link} />
    </div>
  );
};

export default FilePreviewView;
