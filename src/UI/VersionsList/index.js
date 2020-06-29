import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Button from '@material-ui/core/Button';
import Typography from '@ui/Typography';

import useStyles from './styles';

const formatDate = (rawDate) => {
  const momentDate = moment(rawDate).tz(moment.tz.guess());
  const formattedDate = momentDate.format('MM/DD/YYYY');
  const formattedHour = momentDate.format('HH:mm');
  return `${formattedDate} - ${formattedHour}`;
};

const VersionsList = ({
  user,
  members,
  versions,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" weight="medium" className={classes.title}>
        {t('filePreview.versionsHistory.title')}
      </Typography>
      {versions.map((version) => {
        const member = members.find(({ id }) => id === version.modifiedBy);
        const author = `${member.username}${member.id === user.id
          ? t('filePreview.versionsHistory.userIsAuthor')
          : ''}`;
        const wasModified = version.createdAt !== version.modifiedAt;
        const tKey = wasModified
          ? 'filePreview.versionsHistory.modifiedBy'
          : 'filePreview.versionsHistory.addedBy';

        return (
          <div className={classes.itemWrapper}>
            <div className={classes.row}>
              <Typography variant="body1">{version.fileName}</Typography>
              {version.isCurrent
                ? <Typography variant="body1" color="secondary">{t('filePreview.versionsHistory.current')}</Typography>
                : <Button color="secondary" className={classes.btn}>{t('filePreview.versionsHistory.restore')}</Button>}
            </div>
            <Typography variant="body2" color="secondary">
              {formatDate(wasModified ? version.modifiedAt : version.addedAt)}
            </Typography>
            <Typography variant="body2" className={classes.author}>{t(tKey, { user: author })}</Typography>
          </div>
        );
      })}
    </div>
  );
};

VersionsList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  members: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  versions: PropTypes.arrayOf({
    fileName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    modifiedAt: PropTypes.string.isRequired,
    modifiedBy: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
  }).isRequired,
};

export default VersionsList;
