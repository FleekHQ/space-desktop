import { matchPath, useLocation } from 'react-router-dom';

const getDefaultConfig = (location) => ([
  {
    key: 'comments',
    icon: 'comments',
    to: '/file-preview/comments',
    active: !!matchPath(location.pathname, { path: '/file-preview/comments' }),
  },
  {
    key: 'history',
    icon: 'history',
    to: '/file-preview/history',
    active: !!matchPath(location.pathname, { path: '/file-preview/history' }),
  },
]);

// eslint-disable-next-line import/prefer-default-export
export const useNavigation = () => {
  const location = useLocation();
  return getDefaultConfig(location);
};
