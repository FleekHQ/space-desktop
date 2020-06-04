import React from 'react';
import { useSelector } from 'react-redux';
import Empty from './components/Empty';
import Header from './components/Header';
import useStyles from './styles';

const DetailsPanel = () => {
  const classes = useStyles();
  const selectedObjects = useSelector((state) => state.storage.objects);
  console.log({ selectedObjects });
  const getContent = () => {
    if (selectedObjects.length === 0) {
      return <Empty />;
    }
    // if (selectedObjects.length === 1 || true) {
    return (
      <>
        <Header objects={selectedObjects.slice(0, 3)} />
      </>
    );
    // }
    // return null;
  };

  return (
    <div className={classes.root}>
      {getContent()}
    </div>
  );
};
export default DetailsPanel;
