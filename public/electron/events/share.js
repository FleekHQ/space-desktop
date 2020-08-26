const get = require('lodash/get');
const isArray = require('lodash/isArray');
const { ipcMain } = require('electron');

const { spaceClient, apiClient } = require('../clients');

const EVENT_PREFIX = 'share';
const GENERATE_LINK_EVENT = `${EVENT_PREFIX}:generateLink`;
const GENERATE_LINK_ERROR_EVENT = `${EVENT_PREFIX}:generateLink:error`;
const GENERATE_LINK_SUCCESS_EVENT = `${EVENT_PREFIX}:generateLink:success`;
const SHARE_ITEMS_EVENT = `${EVENT_PREFIX}:items`;
const SHARE_ITEMS_ERROR_EVENT = `${EVENT_PREFIX}:itemsError`;
const SHARE_ITEMS_SUCCESS_EVENT = `${EVENT_PREFIX}:itemsSuccess`;
const SHARE_FILES_BY_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:shareFiles`;
const SHARE_FILES_BY_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:shareFiles:error`;
const SHARE_FILES_BY_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:shareFiles:success`;

const registerShareEvents = (mainWindow) => {
  ipcMain.on(GENERATE_LINK_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.generateFileShareLink(payload);
      mainWindow.webContents.send(GENERATE_LINK_SUCCESS_EVENT, {
        link: res.getLink(),
      });
    } catch (err) {
      mainWindow.webContents.send(GENERATE_LINK_ERROR_EVENT, err);
    }
  });

  ipcMain.on(SHARE_ITEMS_EVENT, async (event, payload) => {
    try {
      await spaceClient.shareItemsToSelectGroup(payload);
      mainWindow.webContents.send(SHARE_ITEMS_SUCCESS_EVENT);
    } catch (err) {
      mainWindow.webContents.send(SHARE_ITEMS_ERROR_EVENT, err);
    }
  });

  ipcMain.on(SHARE_FILES_BY_PUBLIC_KEY_EVENT, async (event, payload) => {
    try {
      let usersNotFound = [];
      let usernamesPubKeys = [];

      const paths = get(payload, 'paths', []) || [];
      const usernames = get(payload, 'usernames', []) || [];
      const publicKeys = get(payload, 'publicKeys', []) || [];

      if (usernames.length > 0) {
        const apiTokens = await spaceClient.getAPISessionTokens();
        const { data } = await apiClient.identities.getByUsername({
          usernames,
          token: apiTokens.getServicestoken(),
        });

        const identities = isArray(data.data) ? data.data : [data.data];

        usersNotFound = usernames.reduce((acc, user) => {
          const userExist = identities.findIndex((identity) => {
            const username = get(identity, 'username');
            return username === user;
          }) >= 0;

          if (!userExist) return [...acc, user];
          return acc;
        }, []);

        usernamesPubKeys = identities
          .filter((identity) => identity)
          .map((identity) => identity.publicKey);
      }

      await spaceClient.shareFilesViaPublicKey({
        paths,
        publicKeys: [
          ...publicKeys,
          ...usernamesPubKeys,
        ],
      });

      mainWindow.webContents.send(SHARE_FILES_BY_PUBLIC_KEY_SUCCESS_EVENT, { usersNotFound });
    } catch (err) {
      mainWindow.webContents.send(SHARE_FILES_BY_PUBLIC_KEY_ERROR_EVENT, err);
    }
  });
};

module.exports = registerShareEvents;
