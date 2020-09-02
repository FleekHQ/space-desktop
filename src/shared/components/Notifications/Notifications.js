import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchNotifications,
  handleFilesInvitation,
  setNotificationsLastSeenAt,
} from '@events';
import {
  NotificationMenu,
  NotificationButton,
} from '@ui/Notification';
import { useSelector } from 'react-redux';
import mapDataToItems from './utils/map-data-to-items';

import useStyles from './styles';

const Notifications = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const notifications = useSelector((state) => state.notifications);

  const onCloseMenu = () => {
    setNotificationsLastSeenAt({
      timestamp: Date.now(),
    });
    setAnchorEl(null);
  };

  const onClickHandler = (event) => setAnchorEl(event.currentTarget);

  const hideNewNotifications = () => {
    const { data: { lastSeenAt, notifications: notificationsData } } = notifications;
    if (notificationsData.length === 0) {
      return true;
    }

    if (notificationsData[0].createdAt > lastSeenAt) {
      return false;
    }

    return true;
  };

  const i18n = {
    empty: t('notifications.empty'),
    accept: t('notifications.accept'),
    reject: t('notifications.reject'),
    accepted: t('notifications.accepted'),
    rejected: t('notifications.rejected'),
    markAsRead: t('notifications.markAsRead'),
    notifications: t('notifications.notifications'),
  };

  useEffect(() => {
    // fetch stuff
    fetchNotifications({
      seek: 0,
      limit: 10,
    });
  }, []);

  const loadMore = () => {
    if (!notifications.loading && notifications.data.nextOffset) {
      fetchNotifications({
        seek: notifications.data.nextOffset,
        limit: 10,
      });
    }
  };

  const handleInvitationStatus = (accept) => (item) => {
    const notificationItems = notifications.data.notifications;
    const acceptedNotification = notificationItems.find(
      (notificationItem) => (notificationItem.id === item.id),
    );
    if (acceptedNotification) {
      handleFilesInvitation({
        id: item.id,
        invitationID: acceptedNotification.relatedObject.invitationId,
        accept,
      });
    }
  };

  return (
    <>
      <NotificationButton
        badgeInvisible={hideNewNotifications()}
        onClick={onClickHandler}
        className={classes.root}
      />
      <NotificationMenu
        i18n={i18n}
        items={mapDataToItems(notifications)}
        anchorEl={anchorEl}
        onCloseMenu={onCloseMenu}
        transformOrigin={{
          horizontal: 260,
        }}
        loadMore={loadMore}
        onAcceptInvitation={handleInvitationStatus(true)}
        onRejectInvitation={handleInvitationStatus(false)}
      />
    </>
  );
};

export default Notifications;
