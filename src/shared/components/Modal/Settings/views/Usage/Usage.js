import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleBucketBackup, fetchUsageData } from '@events';
import Prompt from '@shared/components/Modal/Prompt';
import UsageVisual from './components/UsageVisual';

const Usage = () => {
  const { t } = useTranslation();
  const [isModalShown, setIsModalShown] = useState(false);
  const state = useSelector((s) => s.settings.usage);
  const setBackupStorage = () => {
    toggleBucketBackup({
      bucket: 'personal',
      backup: !state.backupEnabled,
    });
  };

  const onConfirmBackupTurnOff = (password) => {
    console.log(password);
    toggleBucketBackup({
      bucket: 'personal',
      backup: !state.backupEnabled,
      password, // this field is not supported at this moment
    });
  };

  const onChangeBackup = () => {
    if (state.backupEnabled) {
      setIsModalShown(true);
    } else {
      setBackupStorage();
    }
  };

  useEffect(() => {
    fetchUsageData();
  }, []);

  return (
    <>
      <UsageVisual
        backupStorage={state.backupEnabled}
        setBackupStorage={onChangeBackup}
        isFreePlan
        planName={state.planName}
        localUsage={state.localUsage}
        backupUsage={state.backupUsage}
      />
      {isModalShown && (
        <Prompt
          title={t('modals.settings.usage.confirmModal.title')}
          message={t('modals.settings.usage.confirmModal.message')}
          // eslint-disable-next-line no-console
          onSubmit={onConfirmBackupTurnOff}
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
