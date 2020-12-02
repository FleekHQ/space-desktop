import React from 'react';
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
      <HistoryUsage />
      <CurrentUsage />
    </div>
  );
};

export default Usage;
