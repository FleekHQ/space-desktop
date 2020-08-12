import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from '@ui/BaseModal';
import Typography from '@ui/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import getContent from './get-content';

const Settings = (props) => {
  const { closeModal } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const contentItems = getContent(t);
  const defaultItem = contentItems.find((item) => item.default);

  const [contentId, setContentId] = useState(defaultItem.id);

  const selectedContentItem = contentItems.find((item) => item.id === contentId);

  return (
    <BaseModal
      paperProps={{
        className: classes.root,
      }}
    >
      <div className={classes.titleContainer}>
        <Typography variant="h6" weight="medium">
          {t('modals.settings.title')}
        </Typography>
        <ButtonBase onClick={closeModal}>
          <FontAwesomeIcon
            icon={faTimes}
            className={classes.closeIcon}
          />
        </ButtonBase>
      </div>
      <div className={classes.bodyContainer}>
        <ul className={classes.sidebar}>
          {contentItems.map((item) => (
            <li key={item.id}>
              <ButtonBase onClick={() => setContentId(item.id)}>
                <Typography
                  variant="body1"
                  color={item.id === selectedContentItem.id ? 'textSecondary' : 'secondary'}
                >
                  {item.title}
                </Typography>
              </ButtonBase>
            </li>
          ))}
        </ul>
        <div className={classes.content}>
          {selectedContentItem.content}
        </div>
      </div>
    </BaseModal>
  );
};

Settings.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Settings;