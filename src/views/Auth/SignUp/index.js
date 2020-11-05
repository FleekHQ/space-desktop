import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import ThirdPartyAuth from '@shared/components/ThirdPartyAuth';
import UsernamePasswordForm from '@shared/components/UsernamePasswordForm';

import { signup, signin } from '@events';
import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';

import useStyles from './styles';

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const state = useSelector((s) => ({
    ...s.auth.signup,
    loading: s.auth.signup.loading || s.auth.signin.loading,
  }));

  const handleUsernamePasswordFormSubmit = ({ username, password }) => {
    signup({
      username,
      password,
    });
  };

  /**
   * @param {Object} payload
   * @param {Boolean=} payload.keyNotExists
   * @param {import('../../../utils/use-torus-sdk').TorusRes} payload.torusRes
   */
  const handleThirdPartyAuthSuccess = ({ torusRes, keyNotExists }) => {
    if (keyNotExists) {
      signup({
        torusRes,
      });
      return;
    }

    signin({ torusRes });
  };

  React.useEffect(() => {
    if (state.success) {
      history.push('/storage');
    }
  }, [state.success]);

  React.useEffect(() => (
    () => {
      dispatch({
        type: SIGNUP_ACTION_TYPES.ON_RESET,
      });
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    }
  ), []);

  return (
    <Box
      display="flex"
      width={580}
      height={288}
      position="relative"
      justifyContent="center"
    >
      <Box flex={1} maxWidth={247} display="inherit" flexDirection="column">
        <Box display="inherit" flexDirection="row" alignItems="flex-end" mb="31px">
          <Typography>
            <Box component="span" fontSize="24px" fontWeight={600} color="common.white">
              {t('modules.signup.title')}
            </Box>
          </Typography>
          <Box ml="111px">
            <Link to="/auth/signin" component={NavLink}>
              <Box component="span" color="#006EFF" fontSize="14px">
                {t('modules.signin.title')}
              </Box>
            </Link>
          </Box>
        </Box>
        <Box mb="20px" width="100%">
          <UsernamePasswordForm
            showPasswordTooltip
            isLoading={state.loading}
            submitBtnText={t('modules.signup.title')}
            onSubmit={handleUsernamePasswordFormSubmit}
          />
        </Box>
        <Box color="common.white" textAlign="center">
          <Typography color="inherit">
            <Box component="span" fontSize="10px" color="common.white">
              {`${t('modules.signup.agreenment.part1')} `}
              <Link href="/" underline="always" color="inherit">
                {`${t('modules.signup.agreenment.privacy')}`}
              </Link>
              &nbsp;&&nbsp;
              <Link href="/" underline="always" color="inherit">
                {t('modules.signup.agreenment.terms')}
              </Link>
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box mt="59px" mb="75px" mx="35px" display="flex" flexDirection="column" alignItems="center">
        <Box flex={1}>
          <Divider orientation="vertical" classes={{ root: classes.dividerRoot }} />
        </Box>
        <Box mt="8px" mb="10px">
          <Typography>
            <Box component="span" color="#5A5A5A">
              or
            </Box>
          </Typography>
        </Box>
        <Box flex={1}>
          <Divider light orientation="vertical" classes={{ root: classes.dividerRoot }} />
        </Box>
      </Box>
      <Box flex={1} maxWidth={247} mt="59px">
        <ThirdPartyAuth
          onError={() => null}
          isLoading={state.loading}
          type={t('modules.signup.title')}
          onSuccess={handleThirdPartyAuthSuccess}
        />
      </Box>
      {
        state.error && (
          <Box
            pl="10px"
            pr="14px"
            bottom={0}
            border={1}
            height={33}
            display="flex"
            color="#EF6A6E"
            borderRadius={4}
            bgcolor="#240F10"
            alignSelf="center"
            position="absolute"
            alignItems="center"
            borderColor="#EF6A6E"
          >
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <Box ml="7px" component="span" color="common.white">
              {t(state.error, { defaultValue: t('modules.signup.errors.generic') })}
            </Box>
          </Box>
        )
      }
    </Box>
  );
};

export default SignUp;
