import { useTranslation } from 'react-i18next';
import { startUpload } from '@events';
import { faFilePlus } from '@fortawesome/pro-regular-svg-icons/faFilePlus';
import { faFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus';
import getUploadComponent from '../components/getUploadComponent';

const upload = (files) => {
  const filesSrcPaths = files.map((file) => ({
    fullPath: file.path,
    relativePathWithFile: file.webkitRelativePath || file.name,
    relativePath: file.webkitRelativePath.replace(new RegExp(`${file.name}$`), ''),
  }));
  startUpload(filesSrcPaths);
};

const useItems = () => {
  const { t } = useTranslation();

  return [
    {
      id: 'file-upload',
      label: t('createNewMenu.fileUpload'),
      component: getUploadComponent(false),
      icon: faFilePlus,
      onClick: upload,
    },
    {
      id: 'folder-upload',
      label: t('createNewMenu.folderUpload'),
      component: getUploadComponent(true),
      icon: faFolderPlus,
      onClick: upload,
    },
  ];
};

export default useItems;
