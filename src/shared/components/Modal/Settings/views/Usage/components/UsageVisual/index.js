import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import AreaChart from '@terminal-packages/space-ui/core/AreaChart';
import PieChart from '@terminal-packages/space-ui/core/PieChart';
// import formatUsageData from './format-usage-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import {
  UpgradeAccount,
  BackupBenefits,
  BackupLimitReaching,
  BackupLimitReached,
} from '../InfoBoxes';

import useStyles from './styles';
import { BaseCard } from '../../../../components';

const Usage = ({
  showInfo,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const getHeader = (title, subTitle, tooltip, usedMemory, totalMemory, widerTooltip) => (
    <div className={classes.header}>
      <Typography>
        <Box fontWeight={600}>{title}</Box>
      </Typography>
      <Typography color="secondary">
        <Box ml="5px">{subTitle}</Box>
      </Typography>
      <Tooltip
        interactive
        placement="bottom"
        title={tooltip}
        classes={{
          popper: classes.popperRoot,
          tooltip: classnames(classes.tooltipRoot, {
            [classes.widerTooltip]: widerTooltip,
          }),
        }}
      >
        <span className={classes.iconBtn}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={classes.infoIcon}
          />
        </span>
      </Tooltip>
      <Typography className={classes.boldText} color="secondary">
        <span className={classes.accentText}>
          <Box component="span" fontSize={23}>{usedMemory}</Box>
          MB
        </span>
        {t('common.of')}
        <Box component="span" ml="4px" fontSize={23}>{totalMemory}</Box>
        GB
      </Typography>
    </div>
  );

  return (
    <div>
      {showInfo === 'upgrade' && <UpgradeAccount />}
      {showInfo === 'backupBenefits' && <BackupBenefits />}
      {showInfo === 'backupLimitReaching' && (
        <BackupLimitReaching backupLimit="500GB" />
      )}
      {showInfo === 'backupLimitReached' && (
        <BackupLimitReached backupLimit="500GB" />
      )}
      <BaseCard className={classes.panel}>
        {getHeader(
          t('modals.settings.usage.currentStorage.title'),
          '',
          t('modals.settings.usage.currentStorage.tooltip'),
          728,
          1,
          false,
        )}
        <AreaChart
          width={530}
          height={136}
          xTickWidth={25}
          ticksNumber={5}
          roundingPrecision={50 * 1024}
          yTicksFormatter={(value) => `${Math.floor(value / 1024)}MB`}
          data={[
            { x: '02/01', y: 204800 },
            { x: '02/03', y: 337920 },
            { x: '02/06', y: 296960 },
            { x: '02/08', y: 419840 },
            { x: '02/10', y: 389120 },
            { x: '02/12', y: 389120 },
            { x: '02/14', y: 440320 },
            { x: '02/16', y: 430080 },
            { x: '02/18', y: 808960 },
            { x: '02/20', y: 450560 },
            { x: '02/22', y: 629760 },
            { x: '02/24', y: 686080 },
          ]}
        />
      </BaseCard>
      <BaseCard className={classes.panel}>
        {getHeader(
          t('modals.settings.usage.currentUsage.title'),
          '(10/01/20 - 10/30/20)',
          t('modals.settings.usage.currentUsage.tooltip'),
          800,
          1,
          true,
        )}
        <div className={classes.pieChartWrapper}>
          <PieChart
            data={[
              { label: 'Bandwidth (150MB)', value: 150, color: '#59F66E' },
              { label: 'Storage (650MB)', value: 650, color: '#0063FF' },
            ]}
            mainLabel={['800', 'MB']}
          />
        </div>
      </BaseCard>
    </div>
  );
};

Usage.defaultProps = {
  showInfo: undefined,
};

Usage.propTypes = {
  showInfo: PropTypes.oneOf([
    'upgrade',
    'backupBenefits',
    'backupLimitReaching',
    'backupLimitReached',
  ]),
};

export default Usage;
