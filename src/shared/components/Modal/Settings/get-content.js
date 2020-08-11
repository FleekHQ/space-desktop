import React from 'react';

export default (t) => [
  {
    id: 'account',
    default: true,
    title: t('modals.settings.account.title'),
    content: <div>account</div>,
  },
  {
    id: 'security',
    title: t('modals.settings.security.title'),
    content: <div>security</div>,
  },
  {
    id: 'notifications',
    title: t('modals.settings.notifications.title'),
    content: <div>notifications</div>,
  },
  {
    id: 'usage',
    title: t('modals.settings.usage.title'),
    content: <div>usage</div>,
  },
  {
    id: 'referrals',
    title: t('modals.settings.referrals.title'),
    content: <div>referrals</div>,
  },
];
