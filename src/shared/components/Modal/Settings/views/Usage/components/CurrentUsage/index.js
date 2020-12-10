import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import PieChart from '@terminal-packages/space-ui/core/PieChart';
import { getCurrentUsage } from '@events';
import { formatBytes } from '@utils';
import useStyles from './styles';
import { BaseCard } from '../../../../components';
import Header from '../Header';

const getFormattedDataRange = (start, end) => {
  if (!start || !end) {
    return '';
  }

  const startFormattedDate = moment(start)
    .tz(moment.tz.guess())
    .format('MM/DD/YY');
  const endFormattedDate = moment(end)
    .tz(moment.tz.guess())
    .format('MM/DD/YY');
  return `(${startFormattedDate} - ${endFormattedDate})`;
};

const CurrentUsage = ({ freeUsageQuota, billingPeriodStart, billingPeriodEnd }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const state = useSelector((s) => s.settings.usage.current);

  useEffect(() => {
    getCurrentUsage();
  }, []);

  const { storage = 0, bandwidth = 0 } = state.data;

  const bandwidthFormatted = formatBytes(bandwidth, 0).join('');
  const storageFormatted = formatBytes(storage, 0).join('');
  const totalUsage = formatBytes(storage + bandwidth, 0);

  return (
    <BaseCard className={classes.panel}>
      <Header
        title={t('modals.settings.usage.currentUsage.title')}
        subtitle={getFormattedDataRange(billingPeriodStart, billingPeriodEnd)}
        tooltip={t('modals.settings.usage.currentUsage.tooltip')}
        usedMemory={totalUsage}
        totalMemory={freeUsageQuota}
        widerTooltip
      />
      <div className={classes.pieChartWrapper}>
        <PieChart
          data={[
            { label: t('modals.settings.usage.currentUsage.labels.bandwidth', { size: bandwidthFormatted }), value: bandwidth, color: '#59F66E' },
            { label: t('modals.settings.usage.currentUsage.labels.storage', { size: storageFormatted }), value: storage, color: '#0063FF' },
          ]}
          mainLabel={totalUsage}
        />
      </div>
    </BaseCard>
  );
};

CurrentUsage.defaultProps = {
  billingPeriodStart: undefined,
  billingPeriodEnd: undefined,
};

CurrentUsage.propTypes = {
  freeUsageQuota: PropTypes.arrayOf(PropTypes.string).isRequired,
  billingPeriodStart: PropTypes.string,
  billingPeriodEnd: PropTypes.string,
};

export default CurrentUsage;
