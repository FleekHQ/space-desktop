import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBillingInfo } from '@events';
import { formatBytes } from '@utils';
import CurrentUsage from './components/CurrentUsage';
import HistoryUsage from './components/HistoryUsage';
import {
  UpgradeAccount,
  BackupBenefits,
  BackupLimitReaching,
  BackupLimitReached,
} from './components/InfoBoxes';

const Usage = () => {
  const showInfo = 'backupLimitReached';
  const state = useSelector((s) => s.billing);
  useEffect(() => {
    getBillingInfo();
  }, []);

  const freeUsageQuota = formatBytes(state.freeUsageQuota);

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
      <HistoryUsage freeUsageQuota={freeUsageQuota} />
      <CurrentUsage freeUsageQuota={freeUsageQuota} />
    </div>
  );
};

export default Usage;
