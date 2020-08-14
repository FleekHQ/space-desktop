import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons/faSpinner';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputTooltip from '@ui/InputTooltip';

import useStyles from './styles';

const RecoverAccount = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const [state, setState] = useState({
    key: '',
    error: t('modules.recoverAccount.keyNotFound'),
    loading: false,
  });

  const tfClasses = {
    root: classnames(classes.textFieldRoot, {
      [classes.textFieldRootError]: !!state.error,
    }),
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

  return (
    <div className={classes.signupRoot}>
      <form className={classes.form} onSubmit={console.log} autoComplete="off">
        <InputTooltip
          type="danger"
          bgColor="secondary"
          title={state.error}
          tooltip={{
            arrow: true,
            open: !!state.error,
            placement: 'right-start',
          }}
        >
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={state.key}
            label={t('modules.recoverAccount.inputLabel')}
            classes={tfClasses}
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
            onChange={(event) => setState({
              ...state,
              key: event.target.value,
            })}
          />
        </InputTooltip>
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          classes={{ root: classes.buttonRoot }}
          disabled={state.loading || !state.key}
        >
          {
            state.loading ? (
              <FontAwesomeIcon spin icon={faSpinner} size="lg" />
            ) : t('modules.recoverAccount.submit')
          }
        </Button>
      </form>
      <Typography
        color="inherit"
        to="/auth/signup"
        component={Link}
        className={classes.link}
      >
        {t('modules.signin.link')}<strong>&nbsp;{t('modules.signup.title')}</strong>
      </Typography>
    </div>
  );
};

export default RecoverAccount;
