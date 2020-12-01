import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

const Header = ({
  title,
  subTitle,
  tooltip,
  usedMemory,
  totalMemory,
  widerTooltip,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.header}>
      <Typography>
        <Box fontWeight={600}>{title}</Box>
      </Typography>
      <Typography color="secondary">
        <Box ml="5px">{subTitle}</Box>
      </Typography>
      <Tooltip
        interactive
        placement="bottom"
        title={tooltip}
        classes={{
          popper: classes.popperRoot,
          tooltip: classnames(classes.tooltipRoot, {
            [classes.widerTooltip]: widerTooltip,
          }),
        }}
      >
        <span className={classes.iconBtn}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={classes.infoIcon}
          />
        </span>
      </Tooltip>
      <Typography className={classes.boldText} color="secondary">
        <span className={classes.accentText}>
          <Box component="span" fontSize={23}>{usedMemory}</Box>
          MB
        </span>
        {t('common.of')}
        <Box component="span" ml="4px" fontSize={23}>{totalMemory}</Box>
        GB
      </Typography>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  usedMemory: PropTypes.string.isRequired,
  totalMemory: PropTypes.string.isRequired,
  widerTooltip: PropTypes.bool.isRequired,
};

export default Header;
