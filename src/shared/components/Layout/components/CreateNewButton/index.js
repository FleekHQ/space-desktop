import React from 'react';
import get from 'lodash/get';
import { remote } from 'electron';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';

import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import { faFileUpload } from '@fortawesome/pro-regular-svg-icons/faFileUpload';
import { faFolderUpload } from '@fortawesome/pro-regular-svg-icons/faFolderUpload';

import { addItems, createFolder } from '@events';
import MenuDropdown from '@ui/MenuDropdown';

import { MENU_DROPDOWN_ITEMS } from './constants';
import useStyles, { useIconButtonStyles } from './styles';

const CreateNewButton = () => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const iconBtnClasses = useIconButtonStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'account-menu' : undefined;
  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDialog = async ({ properties }) => {
    try {
      const { filePaths = [] } = await remote.dialog.showOpenDialog({
        properties: ['multiSelections', ...properties],
      });

      if (filePaths.length) {
        addItems({
          targetPath: prefix,
          sourcePaths: filePaths,
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error when selecting a folder or a file: ', error.message);
    }
  };

  const handleMenuItemClick = (item) => {
    setAnchorEl(null);
    if (item.id === MENU_DROPDOWN_ITEMS.fileUpload) {
      openDialog({ properties: ['openFile'] });
      return;
    }

    if (item.id === MENU_DROPDOWN_ITEMS.folderUpload) {
      openDialog({ properties: ['openDirectory'] });
      return;
    }

    createFolder({ path: prefix });
  };

  return (
    <>
      <IconButton
        disableRipple
        disableFocusRipple
        color="primary"
        aria-describedby={id}
        classes={iconBtnClasses}
        onClick={handleClick}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/icons/plus_colors.png`} alt="add new" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: classes.rootPopover,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuDropdown
          items={[
            {
              id: MENU_DROPDOWN_ITEMS.fileUpload,
              divider: false,
              icon: faFileUpload,
              name: t('createNewMenu.fileUpload'),
            },
            {
              id: MENU_DROPDOWN_ITEMS.folderUpload,
              divider: true,
              icon: faFolderUpload,
              name: t('createNewMenu.fileUpload'),
            },
            {
              id: MENU_DROPDOWN_ITEMS.newFolder,
              divider: false,
              icon: faFolderUpload,
              name: t('createNewMenu.folder'),
            },
          ]}
          onItemClick={handleMenuItemClick}
        />
      </Popover>
    </>
  );
};

export default CreateNewButton;
