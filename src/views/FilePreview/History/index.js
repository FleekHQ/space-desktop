import React from 'react';
import VersionsList from './components/VersionsList';

const History = () => {
  const members = [
    { id: '0', username: 'Darth Vader', imgUrl: 'https://avatarfiles.alphacoders.com/177/thumb-177869.jpg' },
    { id: '1', username: 'Yoda', imgUrl: 'https://cdn.icon-icons.com/icons2/193/PNG/256/Yoda02_23226.png' },
    { id: '2', username: 'Chewbacca', imgUrl: 'https://purepng.com/public/uploads/medium/purepng.com-star-wars-chewbaccastar-warsspace-opera-franchisefilm-star-warswarsstar-1701527826375dgq2g.png' },
  ];

  return (
    <VersionsList
      members={members}
      versions={[
        {
          id: '0',
          fileName: 'HistoryExam.docx',
          createdAt: '2020-06-26T10:35:31.517Z',
          modifiedAt: '2020-06-26T12:35:31.517Z',
          modifiedBy: '1',
          isCurrent: true,
        },
        {
          id: '1',
          fileName: 'HistoryExam.docx',
          createdAt: '2020-06-24T11:35:31.517Z',
          modifiedAt: '2020-06-24T11:35:31.517Z',
          modifiedBy: '0',
          isCurrent: false,
        },
      ]}
      user={members[0]}
    />
  );
};

export default History;
