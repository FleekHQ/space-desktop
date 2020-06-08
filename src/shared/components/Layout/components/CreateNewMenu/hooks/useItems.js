import { remote } from 'electron';
import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import get from 'lodash/get';
import { addItems } from '@events';
import { faFileUpload } from '@fortawesome/pro-regular-svg-icons/faFileUpload';
import { faFolderUpload } from '@fortawesome/pro-regular-svg-icons/faFolderUpload';
import { useUploadEvent } from '@shared/hooks';

import Option from '../components/Option';

const openDialog = ({ prefix, properties }) => async (event) => {
  event.preventDefault();

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

const useItems = () => {
  const { t } = useTranslation();
  const onUpload = useUploadEvent();

  return [
    {
      id: 'file-upload',
      label: t('createNewMenu.fileUpload'),
      component: Option,
      icon: faFileUpload,
      onClick: openDialog({
        prefix,
        properties: ['openFile'],
      }),
    },
    {
      id: 'folder-upload',
      label: t('createNewMenu.folderUpload'),
      component: Option,
      icon: faFolderUpload,
      onClick: openDialog({
        prefix,
        properties: ['openDirectory'],
      }),
    },
  ];
};

export default useItems;
