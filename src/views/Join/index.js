import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { joinBucket } from '@events';

import useStyles from './styles';

const getMessageType = ({
  error,
  success,
}) => {
  if (error) {
    return 'error';
  }

  if (success) {
    return 'success';
  }

  return 'loading';
};

const Join = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const state = useSelector((_state) => _state.join);

  const qs = new URLSearchParams(location.search);
  const key = qs.get('key');
  const addresses = qs.get('addresses');
  const bucketName = qs.get('bucketname');

  React.useEffect(() => {
    if (
      key && key.length
      && addresses && addresses.length
      && bucketName && bucketName.length
    ) {
      setTimeout(() => {
        joinBucket({
          bucket: bucketName,
          threadInfo: {
            key,
            addresses,
          },
        });
      }, 5000);
    }
  }, []);

  React.useEffect(() => {
    let timer;
    if (state.success) {
      timer = setTimeout(() => {
        history.push(`/storage/shared-with-me/${bucketName}`);
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [state.success]);

  return (
    <div className={classes.root}>
      <div className={classes.loading}>
        <img
          alt="space logo"
          src={`${process.env.PUBLIC_URL}/assets/images/space.svg`}
        />
        <div className={classes.orbit}>
          <div className={classes.moon} />
        </div>
      </div>
      <div className={classes.messageContainer}>
        <Typography
          variant="h6"
          align="center"
          color={state.error ? 'error' : 'inherit'}
        >
          {t(`join.${getMessageType({ error: state.error, success: state.success })}`, { bucketName })}
        </Typography>
      </div>
      {
        (state.error || state.success) && (
          <Button
            component={Link}
            color="primary"
            variant="contained"
            to={state.error ? '/storage' : `/storage/shared-with-me/${bucketName}`}
          >
            {t(`join.goTo.${state.error ? 'error' : 'success'}`)}
          </Button>
        )
      }
    </div>
  );
};

export default Join;
