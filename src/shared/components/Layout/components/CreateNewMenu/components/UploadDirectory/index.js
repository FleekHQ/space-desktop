import React from 'react';
import Dropzone from '@shared/components/Dropzone';
import Option from '../Option';

const UploadDirectory = (props) => {
  return (
    <Dropzone noDrag onDrop={console.log} allowOnlyDirectory>
      <Option {...props} />
    </Dropzone>
  );
};

export default UploadDirectory;
