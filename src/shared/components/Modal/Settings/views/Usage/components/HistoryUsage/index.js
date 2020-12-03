import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import AreaChart from '@terminal-packages/space-ui/core/AreaChart';
import { getHistoryUsage } from '@events';
import { formatBytes } from '@utils';

import useStyles from './styles';
import { BaseCard } from '../../../../components';
import Header from '../Header';

const NUMBER_OF_RECORDS_TO_SHOW = 12;

const HistoryUsage = ({ freeUsageQuota }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const state = useSelector((s) => s.settings.usage.history);

  useEffect(() => {
    getHistoryUsage();
  }, []);

  const chartData = state.data.slice(-NUMBER_OF_RECORDS_TO_SHOW).map((item) => ({
    x: moment(item.date).tz(moment.tz.guess()).format('MM/DD'),
    y: item.usage,
  }));

  return (
    <BaseCard className={classes.panel}>
      <Header
        title={t('modals.settings.usage.currentStorage.title')}
        subTitle=""
        tooltip={t('modals.settings.usage.currentStorage.tooltip')}
        usedMemory="728"
        totalMemory={freeUsageQuota}
        withTooltip={false}
      />
      <AreaChart
        width={530}
        height={136}
        xTickWidth={25}
        ticksNumber={5}
        roundingPrecision={50 * 1024}
        yTicksFormatter={(value) => formatBytes(value, 0).join('')}
        data={chartData}
      />
    </BaseCard>
  );
};

HistoryUsage.propTypes = {
  freeUsageQuota: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HistoryUsage;
