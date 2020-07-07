import React from 'react';
import Typography from '@ui/Typography';
import useStyles from './styles';

const FilePreview = () => {
  const title = 'HistoryExam.docx';
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="body1"
        weight="medium"
        align="center"
      >
        {title}
      </Typography>
      <div className={classes.placeholder} />
    </div>
  );
};

export default FilePreview;
