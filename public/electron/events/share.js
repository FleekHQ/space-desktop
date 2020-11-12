const get = require('lodash/get');
const isArray = require('lodash/isArray');
const { ipcMain } = require('electron');

const { spaceClient, apiClient } = require('../clients');
const { getAppTokenMetadata } = require('../utils');

const EVENT_PREFIX = 'share';
const SHARE_ITEMS_EVENT = `${EVENT_PREFIX}:items`;
const SHARE_ITEMS_ERROR_EVENT = `${EVENT_PREFIX}:itemsError`;
const SHARE_ITEMS_SUCCESS_EVENT = `${EVENT_PREFIX}:itemsSuccess`;
const SHARE_FILES_BY_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:shareFiles`;
const SHARE_FILES_BY_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:shareFiles:error`;
const SHARE_FILES_BY_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:shareFiles:success`;
const GENERATE_PUBLIC_LINK_EVENT = `${EVENT_PREFIX}:publicLink`;
const GENERATE_PUBLIC_LINK_ERROR_EVENT = `${EVENT_PREFIX}:publicLink:error`;
const GENERATE_PUBLIC_LINK_SUCCESS_EVENT = `${EVENT_PREFIX}:publicLink:success`;

/* eslint-disable no-console */
const registerShareEvents = (mainWindow) => {
  ipcMain.on(SHARE_ITEMS_EVENT, async (event, payload) => {
    try {
      const tokenMetadata = await getAppTokenMetadata();
      await spaceClient.shareItemsToSelectGroup(payload, tokenMetadata());
      mainWindow.webContents.send(SHARE_ITEMS_SUCCESS_EVENT);
    } catch (err) {
      console.error('SHARE_ITEMS_ERROR_EVENT', err);
      mainWindow.webContents.send(SHARE_ITEMS_ERROR_EVENT, err);
    }
  });

  ipcMain.on(SHARE_FILES_BY_PUBLIC_KEY_EVENT, async (event, payload) => {
    const { notificationId } = payload;
    try {
      let usersNotFound = [];
      let usernamesPubKeys = [];

      const paths = get(payload, 'paths', []) || [];
      const usernames = get(payload, 'usernames', []) || [];
      const publicKeysInput = get(payload, 'publicKeys', []) || [];
      let identities = [];
      const tokenMetadata = await getAppTokenMetadata();

      if (usernames.length > 0) {
        const apiTokens = await spaceClient.getAPISessionTokens(tokenMetadata());
        const { data } = await apiClient.identities.getByUsername({
          usernames,
          token: apiTokens.getServicestoken(),
        });

        identities = isArray(data.data) ? data.data : [data.data];

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

      const publicKeys = [
        ...publicKeysInput,
        ...usernamesPubKeys,
      ];

      await spaceClient.shareFilesViaPublicKey({
        paths,
        publicKeys,
      }, tokenMetadata());

      const getAddress = (publicKey) => {
        const user = identities.find((identity) => identity.publicKey === publicKey);
        return user ? user.address : '';
      };

      mainWindow.webContents.send(SHARE_FILES_BY_PUBLIC_KEY_SUCCESS_EVENT, {
        notificationId,
        usersNotFound,
        objects: paths,
        newMembers: publicKeys.map((publicKey) => ({
          publicKey,
          address: getAddress(publicKey),
        })),
      });
    } catch (error) {
      console.error('SHARE_FILES_BY_PUBLIC_KEY_ERROR_EVENT', error);
      mainWindow.webContents.send(SHARE_FILES_BY_PUBLIC_KEY_ERROR_EVENT, {
        error,
        notificationId,
      });
    }
  });

  ipcMain.on(GENERATE_PUBLIC_LINK_EVENT, async (event, payload) => {
    try {
      const tokenMetadata = await getAppTokenMetadata();
      const res = await spaceClient.generatePublicFileLink(payload, tokenMetadata());
      const linkInfo = {
        link: res.getLink(),
        fileCid: res.getFilecid(),
      };

      mainWindow.webContents.send(GENERATE_PUBLIC_LINK_SUCCESS_EVENT, linkInfo);
    } catch (error) {
      console.error('GENERATE_PUBLIC_LINK_ERROR_EVENT', error);
      mainWindow.webContents.send(GENERATE_PUBLIC_LINK_ERROR_EVENT, error.message);
    }
  });
};

module.exports = registerShareEvents;
