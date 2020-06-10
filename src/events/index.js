import registerEventStream from './stream';
import registerShortcuts from './shortcuts';
import registerConfigEvents from './config';
import registerObjectsEvents from './objects';
import registerPathInfoEvents from './path-info';
import registerGenerateKeyPairEvents from './generate-key-pair';
import registerTxlSubscribeEvents from './txl-subscribe';
import registerAddItemsSubscribeEvents from './add-items-subscribe';

const registerEvents = () => {
  registerShortcuts();
  registerEventStream();
  registerConfigEvents();
  registerObjectsEvents();
  registerPathInfoEvents();
  registerGenerateKeyPairEvents();
  registerTxlSubscribeEvents();
  registerAddItemsSubscribeEvents();
};

export default registerEvents;
export * from './config';
export * from './objects';
export * from './path-info';
export * from './generate-key-pair';
export * from './add-items-subscribe';
