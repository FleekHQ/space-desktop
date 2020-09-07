import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Typography from '@ui/Typography';
import { Trans, useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import useStyles from './styles';

const TRANSITION_TIMEOUT = 300;

const UploadProgress = ({ id, closeModal }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const { t } = useTranslation();
  const { completedFiles = 0, totalFiles = 0, errorMessage } = useSelector((state) => (
    state.storage.uploadsList[id] || {}
  ));

  const classes = useStyles({
    progress: completedFiles / totalFiles || 0,
    error: !!errorMessage,
  });

  const onClickDismiss = () => {
    if (!timeoutId) {
      setTimeoutId(
        setTimeout(closeModal, TRANSITION_TIMEOUT),
      );
    }
  };

  useEffect(() => {
    if (completedFiles === totalFiles && totalFiles !== 0) {
      setTimeoutId(
        setTimeout(closeModal, TRANSITION_TIMEOUT),
      );
    }
  }, [completedFiles]);

  useEffect(() => () => clearTimeout(timeoutId), []);

  const isShownDefaultMsg = completedFiles === 0 && totalFiles === 0;

  return (
    <Grow in={!timeoutId} timeout={TRANSITION_TIMEOUT}>
      <div className={classes.root}>
        <div className={classes.info}>
          <Typography variant="body2" className={classes.message}>
            {errorMessage || (
              <Trans
                i18nKey={isShownDefaultMsg
                  ? 'uploadProgressModal.defaultMessage'
                  : 'uploadProgressModal.message'}
                values={{
                  uploadedNumber: completedFiles,
                  totalNumber: totalFiles,
                }}
                components={[<Box fontWeight="600" component="span" />]}
              />
            )}
          </Typography>
          <Button
            color="secondary"
            className={classes.button}
            onClick={onClickDismiss}
            disableRipple
          >
            {t('uploadProgressModal.dismiss')}
          </Button>
        </div>
        <div className={classes.progressBar} />
      </div>
    </Grow>
  );
};

UploadProgress.propTypes = {
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UploadProgress;
