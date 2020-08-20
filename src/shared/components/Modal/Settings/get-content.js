import React from 'react';

import { Security, Account, Usage } from './views';

export default (t) => [
  {
    id: 'account',
    default: true,
    title: t('modals.settings.account.title'),
    content: <Account />,
  },
  {
    id: 'security',
    title: t('modals.settings.security.title'),
    content: <Security t={t} />,
  },
  {
    id: 'notifications',
    title: t('modals.settings.notifications.title'),
    content: <div>notifications</div>,
  },
  {
    id: 'usage',
    title: t('modals.settings.usage.title'),
    content: <Usage />,
  },
  {
    id: 'referrals',
    title: t('modals.settings.referrals.title'),
    content: <div>referrals</div>,
  },
];
