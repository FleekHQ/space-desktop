import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import Option from './Option';

const ThirdPartyAuth = ({
  type,
  onEthClick,
  onGoogleClick,
  onTwitterClick,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Option
        type={type}
        text={`${type} with Google`}
        icon={<img alt="google" src={`${process.env.PUBLIC_URL}/assets/images/google.png`} />}
        onClick={onGoogleClick}
      />
      <Option
        text={`${type} with Twitter`}
        icon={<img alt="twitter" src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`} />}
        onClick={onTwitterClick}
      />
      <Option
        disabled
        text={`${type} with Ethereum`}
        icon={<img alt="wallet-connect" src={`${process.env.PUBLIC_URL}/assets/images/walletconnect.png`} />}
        onClick={onEthClick}
      />
      <Box mt="-15px" pl="17px" display="flex" alignItems="flex-end">
        <img height={37} src={`${process.env.PUBLIC_URL}/assets/images/curved-arrow.png`} alt="curved-arrow" />
        <Box
          ml="5px"
          top={10}
          fontSize={14}
          component="span"
          color="common.white"
          fontFamily="Kalam"
          position="relative"
        >
          {t('common.comingSoon')}
        </Box>
      </Box>
    </>
  );
};

ThirdPartyAuth.propTypes = {
  onEthClick: PropTypes.func.isRequired,
  onGoogleClick: PropTypes.func.isRequired,
  onTwitterClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['Sign In', 'Sign Up']).isRequired,
};

export default ThirdPartyAuth;
