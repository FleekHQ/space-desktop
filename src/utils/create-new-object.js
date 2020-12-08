const createNewObject = ({
  sourcePath,
  targetPath,
  bucket,
  isDir,
  size,
}) => {
  const splitSourcePath = sourcePath.split('/');
  const filename = splitSourcePath[splitSourcePath.length - 1];
  const folderPath = targetPath === '' ? '' : `/${targetPath}`;
  const fullKey = `${bucket}${folderPath}/${filename}`;

  const getFileExtension = () => {
    if (isDir) {
      return 'folder';
    }
    const splitFilename = filename.split('.');
    return splitFilename.length === 1 ? '' : splitFilename[splitFilename.length - 1];
  };

  const timestamp = new Date().getTime();

  return ({
    key: filename,
    ext: getFileExtension(),
    dbId: undefined,
    type: isDir ? 'folder' : 'file',
    name: filename,
    size,
    bucket,
    members: [],
    created: timestamp,
    bytesSize: '',
    error: false,
    lastModified: timestamp,
    isPublicLink: false,
    isLocallyAvailable: true,
    selected: undefined,
    id: fullKey,
    fullKey,
    ipfsHash: '',
    isAvailableInSpace: false,
    sourceBucket: bucket,
    shareAmount: 1,
    isUploading: true,
  });
};

export default createNewObject;
