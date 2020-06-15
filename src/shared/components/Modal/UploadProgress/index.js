import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
import Typography from '@ui/Typography';
import { Trans, useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const UploadProgress = ({ closeModal }) => {
  const { t } = useTranslation();

  const uploadedFiles = 4;
  const totalFiles = 22;
  const classes = useStyles({ progress: uploadedFiles / totalFiles });

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <Typography variant="body2">
          <Trans
            i18nKey="uploadProgressModal.message"
            values={{ uploadedNumber: uploadedFiles, totalNumber: totalFiles }}
            components={[<Box fontWeight="600" component="span" />]}
          />
        </Typography>
        <Button
          color="secondary"
          className={classes.button}
          onClick={closeModal}
        >
          {t('uploadProgressModal.dismiss')}
        </Button>
      </div>
      <div className={classes.progressBar} />
    </div>
  );
};

UploadProgress.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default UploadProgress;
