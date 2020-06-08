import { matchPath, useLocation } from 'react-router-dom';
import get from 'lodash/get';
import { startUpload } from '@events';

const useUploadEvent = () => {
  const location = useLocation();
  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '');

  const onUpload = (files) => {
    const filesSrcPaths = files.map((file) => ({
      fullPath: file.path,
      relativePathWithFile: file.webkitRelativePath || file.name,
      relativePath: file.webkitRelativePath.replace(new RegExp(`${file.name}$`), ''),
    }));
    startUpload({ files: filesSrcPaths, prefix });
  };

  return onUpload;
};

export default useUploadEvent;
