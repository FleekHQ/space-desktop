import React from 'react';
import CommentsSection from './components/CommentsSection';

const Comments = () => {
  const members = [
    { id: '0', username: 'Darth Vader', imgUrl: 'https://avatarfiles.alphacoders.com/177/thumb-177869.jpg' },
    { id: '1', username: 'Yoda' },
    { id: '2', username: 'Chewbacca', imgUrl: 'https://purepng.com/public/uploads/medium/purepng.com-star-wars-chewbaccastar-warsspace-opera-franchisefilm-star-warswarsstar-1701527826375dgq2g.png' },
  ];

  const threads = [
    {
      id: '0',
      comments: [
        {
          id: '0',
          author: '1',
          createdAt: '2020-06-22T09:51:46.055Z',
          content: 'Fear is the path to the dark side. Fear leads to anger; anger leads to hate; hate leads to suffering. I sense much fear in you.',
        },
      ],
    },
    {
      id: '1',
      comments: [
        {
          id: '0',
          author: '2',
          createdAt: '2020-06-24T09:51:46.055Z',
          content: 'WWWWWWWGGGGHHHRRRRW."',
        },
        {
          id: '1',
          author: '0',
          createdAt: '2020-06-24T09:51:46.055Z',
          content: 'The dark side of the Force agree with you!',
        },
      ],
    },
  ];

  return (
    <CommentsSection
      threads={threads}
      members={members}
      user={members[0]}
      createThread={() => {}}
      onEdit={() => {}}
      onRemove={() => {}}
      onAddAnswer={() => {}}
      resolve={() => {}}
    />
  );
};

export default Comments;
