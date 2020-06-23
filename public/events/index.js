const registerEventStream = require('./stream');
const registerConfigEvents = require('./config');
const registerPathInfoEvents = require('./path-info');
const registerObjectsEvents = require('./objects').default;
const registerGenerateKeyPairEvents = require('./generate-key-pair');
const registerTxlSubscribe = require('./txl-subscribe');
const registerAddItemsSubscribe = require('./add-items-subscribe');
const registerAppUpdate = require('./app-update');

const registerEvents = ({
  app,
  isDev,
  mainWindow,
  autoUpdater,
}) => {
  const stream = registerEventStream(mainWindow);
  const txlStream = registerTxlSubscribe(mainWindow);

  registerConfigEvents(mainWindow);
  registerObjectsEvents(mainWindow);
  registerPathInfoEvents(mainWindow);
  registerAddItemsSubscribe(mainWindow);
  registerGenerateKeyPairEvents(mainWindow);

  if (!isDev) {
    registerAppUpdate({ app, mainWindow, autoUpdater });
  }

  return () => {
    stream.destroy();
    txlStream.destroy();
  };
};

module.exports = registerEvents;
