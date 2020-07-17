import React from 'react';
import ShareBox from '@ui/ShareBox';
import { useTranslation } from 'react-i18next';
import Masonry from 'react-masonry-css';
import useStyles from './styles';

const sharedByItem = {
  user: {
    imgUrl: '',
    username: 'Username',
  },
  objectsList: [
    {
      ext: 'docx',
      name: 'TechDocsV2.docx',
    },
    {
      ext: 'pdf',
      name: 'IPFS-Report.pdf',
    },
    {
      ext: 'zip',
      name: 'Branding.zip',
    },
    {
      ext: 'png',
      name: 'Logo.png',
    },
  ],
};

const sharedByList = Array.from({ length: 20 }, (item, index) => ({
  id: index,
  user: {
    imgUrl: '',
    username: sharedByItem.user.username + index,
  },
  objectsList: sharedByItem.objectsList.slice(0, Math.ceil(Math.random() * 4)),
}));

const breakpointColumnsObj = {
  default: 8,
  2000: 7,
  1800: 6,
  1600: 5,
  1400: 4,
  1200: 3,
  950: 2,
  750: 1,
};

const SharedBy = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={classes.masonryGrid}
      columnClassName={classes.masonryColumn}
    >
      {sharedByList.map((item) => (
        <div key={item.id} className={classes.itemWrapper}>
          <ShareBox
            user={item.user}
            objectsList={item.objectsList}
            showViewAllBtn={item.objectsList.length > 3}
            onViewAllClick={() => console.log('onViewAllClick')}
            onObjectClick={() => console.log('onObjectClick')}
            i18n={{
              subtitle: t('modules.storage.sharedBy.mostRecentShared'),
              viewAll: t('modules.storage.sharedBy.viewAll'),
            }}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default SharedBy;
