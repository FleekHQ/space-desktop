import { matchPath, useLocation } from 'react-router-dom';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';

const defaultConfig = [
  {
    icon: 'files',
    to: '/storage/files',
    tKey: 'navigation.storage',
    subNav: [
      {
        tKey: 'navigation.files',
        to: '/storage/files',
      },
    ],
  }
];

export const useNavigations = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const generalNav = defaultConfig.map((navItem) => ({
    ...navItem,
    active: matchPath(location.pathname, { path: navItem.to }),
  }));

  const activeGeneralNavOption = generalNav.find((navItem) => navItem.active);
  const subNavigation = get(activeGeneralNavOption, 'subNav', []);
  const specificNavTitle = t(get(activeGeneralNavOption, 'tKey', ''));
  const specificNavList = subNavigation.map((navItem) => ({
    text: t(navItem.tKey),
    to: navItem.to,
    active: matchPath(location.pathname, { path: navItem.to }),
  }));

  return {
    generalNav,
    specificNav: {
      title: specificNavTitle,
      list: specificNavList,
    },
  };
};
