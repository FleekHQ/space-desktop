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
import registerUsageEvents from './usage';
import registerNotificationSubscribe from './notifications-subscribe';
import registerBillingEvents from './billing';
import registerSubscriptions from './subscriptions';

const registerEvents = () => {
  registerShortcuts();
  registerAuthEvents();
  registerEventStream();
  registerShareEvents();
  registerObjectsEvents();
  registerTxlSubscribeEvents();
  registerAddItemsSubscribeEvents();
  registerBucketEvents();
  registerKeysEvents();
  registerNotificationsEvents();
  registerAccountEvents();
  registerFolderEvents();
  registerIdentitiesEvents();
  registerUsageEvents();
  registerNotificationSubscribe();
  registerBillingEvents();
  registerSubscriptions();
  registerSubscriptions();
};

export default registerEvents;
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
export * from './usage';
export * from './billing';
export * from './win-resize';
export * from './subscriptions';
