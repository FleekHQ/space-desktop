import React from 'react';
import Dropzone from '@shared/components/Dropzone';
import Option from '../Option';

const getUploadComponent = (onlyDirectory) => ({
  closeParent,
  onClick,
  ...restProps
}) => {
  const onDrop = (files) => {
    onClick(files);
    closeParent();
  };

  return (
    <Dropzone noDrag onDrop={onDrop} allowOnlyDirectory={onlyDirectory}>
      <Option {...restProps} onClick={() => {}} closeParent={() => {}} />
    </Dropzone>
  );
}


export default getUploadComponent;
