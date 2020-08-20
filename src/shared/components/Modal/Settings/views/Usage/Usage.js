import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwitchButton from '@shared/components/SwitchButton';
import useStyles from './styles';
import { BaseCard, Header, Section } from '../../components';

const Usage = ({ backupStorage, setBackupStorage }) => {
  const classes = useStyles({ backupStorage });
  const { t } = useTranslation();
  const switchBtnI18n = {
    enable: t('common.on'),
    disable: t('common.off'),
  };

  return (
    <div>
      <BaseCard className={classes.localUsageContainer}>
        <Header>
          Local Usage Diagram
        </Header>
      </BaseCard>
      <BaseCard className={classes.backupSwitchContainer}>
        <Header>
          <Section>
            <Typography variant="body1" weight="medium" component="span">
              <Trans
                i18nKey="modals.settings.usage.backup.switchTitle"
                values={{ value: backupStorage ? switchBtnI18n.enable : switchBtnI18n.disable }}
                components={[<Box fontWeight="600" component="span" className={classes.backupValue} />]}
              />
            </Typography>
          </Section>
          <Section>
            {/* <Typography variant="body1" weight="medium" component="span">
              <Trans
                i18nKey="modals.settings.usage.local.diagramTitle"
                values={{ fileName: translationTitle }}
                components={[<Box fontWeight="600" component="span" />]}
              />
            </Typography> */}
            <SwitchButton
              value={backupStorage ? 'on' : 'off'}
              onChange={setBackupStorage}
              i18n={switchBtnI18n}
            />
          </Section>
        </Header>
      </BaseCard>
      <BaseCard className={classes.backupDiagramContainer}>
        <Header>
          Backup Diagram
        </Header>
      </BaseCard>
    </div>
  );
};

// Usage.defaultProps = {
//   backupStorage: true,
// };

Usage.propTypes = {
  backupStorage: PropTypes.bool.isRequired,
  setBackupStorage: PropTypes.func.isRequired,
};

export default Usage;

// modals.settings.usage
// "settings": {
//   "usage": {
//     "using": "Using <0>{size}</0>",
//     "storage": "Storage ({{size}})",
//     "transferMonthly": "Transfer - Resets Monthly ({{size}})",
//     "local": {
//       "diagramTitle": "Local Usage"
//     },
//     "backup": {
//       "switchTitle": "Backup Storage is <0>{{value}}</0>",
//       "diagramTitle": "Space Usage ({{size}} included in {{plan}})"
//     }
//   }
// }
