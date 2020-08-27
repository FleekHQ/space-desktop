import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash';

import { signin } from '@events';

import useStyles from './styles';

const UsernameSignin = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const siginState = useSelector((s) => s.auth.signin);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const textFieldClasses = {
    root: classes.textFieldRoot,
  };

  const InputProps = {
    classes: {
      root: classes.inputPropsRoot,
      input: classes.inputPropsInput,
    },
  };

  const InputLabelProps = {
    classes: {
      root: classes.inputLabelPropsRoot,
      shrink: classes.inputLabelPropsShrink,
    },
  };

  React.useEffect(() => {
    if (siginState.success) {
      history.push('/storage');
    }
  }, [siginState.success]);

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={handleShowPassword}
        className={classes.iconButton}
        onMouseDown={(e) => e.preventDefault()}
      >
        {showPassword ? (
          <FontAwesomeIcon
            icon={faEye}
            className={classes.icon}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className={classes.icon}
          />
        )}
      </IconButton>
    </InputAdornment>
  );

  const onSubmit = (e) => {
    e.preventDefault();

    signin({ username, password });
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          label={t('modules.signin.username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          classes={textFieldClasses}
          InputProps={InputProps}
          InputLabelProps={InputLabelProps}
        />
        <TextField
          value={password}
          variant="outlined"
          label={t('modules.signin.password')}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          classes={textFieldClasses}
          InputLabelProps={InputLabelProps}
          InputProps={{
            endAdornment,
            ...InputProps,
          }}
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          className={classes.submitButton}
          disabled={username.length === 0 || password.length === 0 || siginState.loading}
        >
          {
            siginState.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.signin.title')
          }
        </Button>
      </form>
      {
        siginState.error && (
          <div className={classes.alert}>
            <Typography color="inherit" variant="body2">
              {t(siginState.error, { defaultValue: t('modules.signin.errors.generic') })}
            </Typography>
          </div>
        )
      }
      <Link
        to="/auth/restore-keys-mnemonic"
        className={classes.forgotPasswordLink}
      >
        {t('modules.signin.recover')}
      </Link>
      <Typography
        color="inherit"
        to="/auth/signup"
        component={Link}
        className={classes.signUplink}
      >
        {t('modules.signin.link')}<strong>&nbsp;{t('modules.signup.title')}</strong>
      </Typography>
    </div>
  );
};

export default UsernameSignin;
