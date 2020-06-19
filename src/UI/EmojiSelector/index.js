import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/pro-regular-svg-icons/faSmile';
import useStyles from './styles';

const popperModifiers = {
  offset: {
    offset: '0,5', // 5px lower
  },
};

const EmojiSelector = ({ onSelect, placement, placeholder }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'emoji-popper' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        className={classes.btn}
        disableRipple
      >
        <FontAwesomeIcon icon={faSmile} />
      </Button>
      <Popper
        open={open}
        id={id}
        anchorEl={anchorEl}
        placement={placement}
        modifiers={popperModifiers}
      >
        <ClickAwayListener onClickAway={handleClick}>
          <Picker
            onSelect={onSelect}
            emoji="smiley"
            title={placeholder}
          />
        </ClickAwayListener>
      </Popper>
    </>
  );
};

EmojiSelector.defaultProps = {
  placement: 'bottom-end',
};

EmojiSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  placement: PropTypes.string,
};

export default EmojiSelector;
