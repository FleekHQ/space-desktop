import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MessageBox from '@ui/MessageBox';
import { WELCOME_ACTION_TYPES } from '@reducers/welcome';
import { openModal, SETTINGS_MODAL } from '@shared/components/Modal/actions';

import useStyles from './styles';

const handleSettingsModal = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch(openModal(SETTINGS_MODAL, { defaultItem: event.currentTarget.id }));
};

const handleDismiss = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch({
    key: event.currentTarget.id,
    type: WELCOME_ACTION_TYPES.ON_DISMISS,
  });
};

const WelcomeMessages = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((s) => ({
    ...s.welcome,
    hideUsername: s.welcome.hideUsername || s.user.username.length !== 0,
  }));

  if (state.hideBackup && state.hideUsername && state.hideIntegration) {
    return null;
  }

  return (
    <div className={classes.rootWelcome}>
      {
        !state.hideBackup && (
          <MessageBox title={t('welcome.backup.title')} bgColor="primary">
            <Typography variant="body2" color="textPrimary">
              {t('welcome.backup.description')}
            </Typography>
            <div className={classes.btnGroup}>
              <Button
                id="security"
                type="button"
                color="primary"
                variant="contained"
                classes={{ root: classes.btn }}
                onClick={handleSettingsModal({ dispatch })}
              >
                {t('common.backup')}
              </Button>
              <Button
                type="button"
                id="hideBackup"
                classes={{ root: classes.btn }}
                onClick={handleDismiss({ dispatch })}
              >
                {t('common.remindMeLater')}
              </Button>
            </div>
          </MessageBox>
        )
      }
      {
        !state.hideUsername && (
          <MessageBox title={t('welcome.username.title')} bgColor="secondary">
            <Typography variant="body2" color="textPrimary">
              {t('welcome.username.description')}
            </Typography>
            <div className={classes.btnGroup}>
              <Button
                id="account"
                type="button"
                variant="contained"
                color="primary"
                classes={{ root: classes.btn }}
                onClick={handleSettingsModal({ dispatch })}
              >
                {t('common.create')}
              </Button>
              <Button
                type="button"
                id="hideUsername"
                classes={{ root: classes.btn }}
                onClick={handleDismiss({ dispatch })}
              >
                {t('common.dismiss')}
              </Button>
            </div>
          </MessageBox>
        )
      }
      {
        !state.hideIntegration && (
          <MessageBox title={t('welcome.integrations.title')} bgColor="secondary">
            <Typography variant="body2" color="textPrimary">
              {t('welcome.integrations.description')}
            </Typography>
            <div className={classes.btnGroup}>
              <Button
                id="usage"
                type="button"
                variant="contained"
                color="primary"
                classes={{ root: classes.btn }}
                onClick={handleSettingsModal({ dispatch })}
              >
                {t('common.enable')}
              </Button>
              <Button
                type="button"
                id="hideIntegration"
                classes={{ root: classes.btn }}
                onClick={handleDismiss({ dispatch })}
              >
                {t('common.dismiss')}
              </Button>
            </div>
          </MessageBox>
        )
      }
    </div>
  );
};

export default WelcomeMessages;
