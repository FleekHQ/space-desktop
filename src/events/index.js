import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import registerAuthEvents from './auth';
import registerEventStream from './stream';
import registerShortcuts from './shortcuts';
import registerShareEvents from './share';
import registerObjectsEvents from './objects';
import registerTxlSubscribeEvents from './txl-subscribe';
import registerAddItemsSubscribeEvents from './add-items-subscribe';
import registerBucketEvents from './bucket';
import registerKeysEvents from './keys';
import registerNotificationsEvents from './notifications';
import registerAccountEvents from './account';
import registerFolderEvents from './folder';
import registerIdentitiesEvents from './identities';
import registerNotificationSubscribe from './notifications-subscribe';
import walletSubscribe from './wallet';
import registerSubscriptions from './subscriptions';
import registerUsage from './usage';

const RegisterEvents = () => {
  const history = useHistory();

  useEffect(() => {
    registerShortcuts();
    registerAuthEvents();
    registerEventStream();
    registerShareEvents();
    registerObjectsEvents();
    registerTxlSubscribeEvents();
    registerAddItemsSubscribeEvents();
    registerBucketEvents();
    registerKeysEvents();
    registerNotificationsEvents(history);
    registerAccountEvents();
    registerFolderEvents();
    registerIdentitiesEvents();
    registerNotificationSubscribe();
    walletSubscribe();
    registerSubscriptions();
    registerUsage();
  }, []);

  return null;
};

export default RegisterEvents;
export * from './auth';
export * from './share';
export * from './objects';
export * from './add-items-subscribe';
export * from './bucket';
export * from './keys';
export * from './notifications';
export * from './account';
export * from './folder';
export * from './identities';
export * from './wallet';
export * from './win-resize';
export * from './subscriptions';
export * from './usage';
