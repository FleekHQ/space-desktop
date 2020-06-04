import React from 'react';
import { useSelector } from 'react-redux';
import Empty from './components/Empty';
import Header from './components/Header';
import ObjectDetails from './components/ObjectDetails';
import SharePanel from './components/SharePanel';
import useStyles from './styles';

const DetailsPanel = () => {
  const classes = useStyles();
  const selectedObjects = useSelector((state) => state.storage.objects);
  console.log({ selectedObjects });
  const getContent = () => {
    if (selectedObjects.length === 0) {
      return <Empty />;
    }
    if (selectedObjects.length === 1 || true) {
      return (
        <>
          <Header objects={selectedObjects} />
          <div className={classes.divider} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ObjectDetails {...selectedObjects[0]} />
          <div className={classes.divider} />
          <SharePanel />
        </>
      );
    }
    return <Header objects={selectedObjects} />;
  };

  return (
    <div className={classes.root}>
      {getContent()}
    </div>
  );
};
export default DetailsPanel;
