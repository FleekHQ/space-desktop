import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleBucketBackup, fetchUsageInfo } from '@events';
import Prompt from '@shared/components/Modal/Prompt';
import UsageVisual from './components/UsageVisual';

const Usage = () => {
  const { t } = useTranslation();
  const [isModalShown, setIsModalShown] = useState(true);
  const state = useSelector((s) => s.settings.usage);
  const setBackupStorage = () => {
    toggleBucketBackup({
      bucket: 'personal',
      backup: !state.backup,
    });
  };

  useEffect(() => {
    fetchUsageInfo();
  }, []);

  return (
    <>
      <UsageVisual
        backupStorage={state.backup}
        setBackupStorage={setBackupStorage}
        isFreePlan
        planName={state.planName}
        localUsage={state.localUsage}
        backupUsage={state.backupUsage}
      />
      {isModalShown && (
        <Prompt
          title={t('modals.settings.usage.confirmModal.title')}
          message={t('modals.settings.usage.confirmModal.message')}
          onSubmit={() => console.log('onSubmit')}
          validate={(value) => value}
          closeModal={() => setIsModalShown(false)}
          i18n={{
            cancel: t('common.cancel'),
            submit: t('common.confirm'),
            label: t('modals.settings.usage.confirmModal.label'),
          }}
        />
      )}
    </>
  );
};

export default Usage;
