import { useTranslation } from 'react-i18next';
import { faFilePlus } from '@fortawesome/pro-regular-svg-icons/faFilePlus';
import { faFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus';
import UploadFiles from '../components/UploadFiles';
import UploadDirectory from '../components/UploadDirectory';

const useItems = () => {
  const { t } = useTranslation();

  return [
    {
      id: 'file-upload',
      label: t('createNewMenu.fileUpload'),
      component: UploadFiles,
      icon: faFilePlus,
    },
    {
      id: 'folder-upload',
      label: t('createNewMenu.folderUpload'),
      component: UploadDirectory,
      icon: faFolderPlus,
    },
  ];
};

export default useItems;
