import React from 'react';
import { useSelector } from 'react-redux';
import { toggleBucketBackup } from '@events';
import UsageVisual from './components/UsageVisual';

const Usage = () => {
  const state = useSelector((s) => s.settings.usage);
  const setBackupStorage = () => {
    toggleBucketBackup({
      bucket: 'personal',
      backup: !state.backup,
    });
  };
  console.log(state);
  return (
    <UsageVisual
      backupStorage={state.backup}
      setBackupStorage={setBackupStorage}
      isFreePlan
      planName="Free plan"
      localUsage={{
        using: 4634563,
        storage: 923552,
        transfer: 3544362,
      }}
      backupUsage={{
        storage: 4456352,
        transfer: 3544362,
        using: 43426,
        maxUsing: 435345634,
      }}
    />
  );
};

export default Usage;
