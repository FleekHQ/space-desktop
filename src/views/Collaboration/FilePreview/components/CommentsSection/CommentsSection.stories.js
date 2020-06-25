import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import CommentsSection from './index';

const categoryName = 'CommentsSection';

const members = [
  { id: '0', username: 'Darth Vader', imgUrl: 'https://avatarfiles.alphacoders.com/177/thumb-177869.jpg' },
  { id: '1', username: 'Yoda', imgUrl: 'https://cdn.icon-icons.com/icons2/193/PNG/256/Yoda02_23226.png' },
  { id: '2', username: 'Chewbacca', imgUrl: 'https://purepng.com/public/uploads/medium/purepng.com-star-wars-chewbaccastar-warsspace-opera-franchisefilm-star-warswarsstar-1701527826375dgq2g.png' },
];

const initialThreads = [
  {
    id: '0',
    comments: [
      {
        id: '0',
        author: '1',
        createdAt: '2020-06-22T09:51:46.055Z',
        content: 'Fear is the path to the dark side. Fear leads to anger; anger leads to hate; hate leads to suffering. I sense much fear in you.',
      },
    ]
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
        id: '0',
        author: '0',
        createdAt: '2020-06-24T09:51:46.055Z',
        content: 'The dark side of the Force agree with you!',
      },
    ],
  },
]

storiesOf(categoryName, module).add('CommentsSection', () => {
  const [threads, setThreads] = useState(initialThreads);

  const props = {
    threads,
    members,
    user: members[0],
    createThread: (value) => {
      setThreads((threads) => [
        ...threads,
        {
          id: (
            parseInt(
              (
                threads[threads.length - 1] || { id: '0' }
              ).id,
              10,
            ) + 1
          ).toString(),
          comments: [
            {
              id: '0',
              author: '0',
              content: value,
              createdAt: new Date().toISOString(),
            },
          ],
        }
      ]);
    },
    onEdit: (threadId, commentId, newValue) => {
      setThreads((threads) => threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            comments: thread.comments.map((comment) => {
              return comment.id === commentId ? {
                ...comment,
                content: newValue,
              } : comment
            })
          }
        }
        return thread;
      }));
    },
    onRemove: (threadId, commentId) => {
      setThreads((threads) => threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            comments: thread.comments.filter(
              (comment) => comment.id !== commentId,
            ),
          }
        }
        return thread;
      }).filter((thread) => thread.comments.length > 0)); // remove if thread is empty
    },
    onAddAnswer: (threadId, value) => {
      setThreads((threads) => threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            comments: [
              ...thread.comments,
              {
                id: (parseInt(thread.comments[thread.comments.length - 1].id, 10) + 1).toString(),
                author: '0',
                content: value,
                createdAt: new Date().toISOString(),
              }
            ],
          }
        }
        return thread;
      }));
    },
    resolve: (threadId) => {
      setThreads((threads) => threads.filter((thread) => thread.id !== threadId));
    },
  };



  return (
    <div style={{ width: 392, backgroundColor: '#fff' }}>
      <CommentsSection {...props} />
    </div>
  );
});