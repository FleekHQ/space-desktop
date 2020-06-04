import React from 'react';
import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import Button from '@material-ui/core/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons/faEllipsisH';
// import FileIcon from '@ui/FileIcon';
// import Typography from '@ui/Typography';
import Empty from './components/Empty';
import useStyles from './styles';

const DetailsPanel = () => {
  const classes = useStyles();
  // const { t } = useTranslation();
  const selectedObjects = useSelector((state) => state.storage.objects);
  const content = <Empty />;

  return (
    <div className={classes.root}>
      {content}
    </div>
  );

  <div className={classes.fileIconWrapper}>
    <FileIcon
      src={src}
      ext={ext}
    />
  </div>

  <Button variant="outlined">
    <FontAwesomeIcon icon={faEllipsisH} />
  </Button>
};

export default DetailsPanel;
