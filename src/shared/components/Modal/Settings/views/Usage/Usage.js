import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwitchButton from '@shared/components/SwitchButton';
import UsageBars from '@ui/UsageBars';
import palette from '@ui/theme/palette';
import { formatBytes } from '@utils';
import useStyles from './styles';
import { BaseCard, Header, Section } from '../../components';

const getUsageComponent = (size, isShownMaxSize, maxSize) => (
  <Typography variant="body2" color="secondary">
    <Trans
      i18nKey={`modals.settings.usage.${isShownMaxSize ? 'usingOf' : 'using'}`}
      values={{ size: formatBytes(size), maxSize: formatBytes(maxSize) }}
      components={[<Box color="text.primary" component="span" />]}
    />
  </Typography>
);

const Usage = ({ backupStorage, setBackupStorage }) => {
  const classes = useStyles({ backupStorage });
  const { t } = useTranslation();
  const switchBtnI18n = {
    enable: t('common.on'),
    disable: t('common.off'),
  };

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
  // }modals.settings.usage.storage
  const isFreePlan = true;
  const localUsage = {
    storage: 42352,
    transfer: 3544362,
  };

  const backupData = {
    turnedOn: true,
    storage: 42352,
    transfer: 3544362,
    using: 43426,
    maxUsing: 435345634,
  };

  return (
    <div>
      <BaseCard className={classes.localUsageContainer}>
        <Header>
          <div className={classes.usageBarsWrapper}>
            <UsageBars
              title={t('modals.settings.usage.local.diagramTitle')}
              items={[
                {
                  text: t('modals.settings.usage.storage', { size: formatBytes(localUsage.storage) }),
                  color: palette.palette.blue1,
                  width: 30,
                },
                {
                  text: t('modals.settings.usage.transferMonthly', { size: formatBytes(localUsage.transfer) }),
                  color: palette.palette.blue3,
                  width: 70,
                },
              ]}
              using={getUsageComponent(localUsage.using, false, localUsage.maxUsing)}
            />
          </div>
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
          <div className={classes.usageBarsWrapper}>
            <UsageBars
              disabled={!backupStorage}
              title={t('modals.settings.usage.backup.diagramTitle', { size: '1GB', plan: 'Free Plan' })}
              items={[
                {
                  text: t('modals.settings.usage.storage', { size: '802.13 MB' }),
                  color: palette.palette.blue1,
                  width: 30,
                },
                {
                  text: t('modals.settings.usage.transferMonthly', { size: '802.13 MB' }),
                  color: palette.palette.blue3,
                  width: 70,
                },
              ]}
              using={getUsageComponent(backupData.using, isFreePlan, backupData.maxUsing)}
            />
          </div>
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
