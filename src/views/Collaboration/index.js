import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import Layout from '@shared/components/Layout';
// import FilePreview from './FilePreview';

const Storage = () => {
  const match = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route path={`${match.path}/file-preview/*`}>
          {/* <FilePreview /> */}
        </Route>
        <Redirect to={`${match.path}/file-preview/`} />
      </Switch>
    </Layout>
  );
};

export default Storage;
