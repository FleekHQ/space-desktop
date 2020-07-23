import React from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

// TODO: use it when integration is ready
import Typography from '@material-ui/core/Typography';
import CollaboratorList from '../CollaboratorList';

import useStyles from './styles';

/* const handleCopyLink = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch({
    type: SHARE_TYPES.ON_GENERATE_LINK,
  });
}; */

const SharePanel = (props) => {
  const {
    collaborators,
    onShare,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Button
        fullWidth
        variant="contained"
        onClick={onShare}
      >
        {t('detailsPanel.share.share')}
      </Button>
      <div className={classes.shareWidth}>
        <Typography variant="body1">
          {t('detailsPanel.share.with')}
        </Typography>
        <Typography component="a" variant="body1" color="textSecondary">
          {t('detailsPanel.share.manage')}
        </Typography>
      </div>
      <CollaboratorList collaborators={collaborators} t={t} />
    </div>
  );
};

SharePanel.defaultProps = {
  collaborators: [],
};

SharePanel.propTypes = {
  collaborators: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired),
  onShare: PropTypes.func.isRequired,
};

export default SharePanel;
