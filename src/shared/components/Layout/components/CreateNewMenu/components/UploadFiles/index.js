import React from 'react';
import Dropzone from '@shared/components/Dropzone';
import Option from '../Option';

const UploadFiles = (props) => {
  console.log({ props });
  return (
    <Dropzone noDrag onDrop={console.log}>
      <Option {...props} />
    </Dropzone>
  );
};

export default UploadFiles;
