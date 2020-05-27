import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import useItems from './hooks/useItems';

const Dropdown = ({
  close,
  children,
  ...restProps
}) => {
  const classes = useStyles(restProps);
  const items = useItems();

  return (
    <div className={classes.container}>
      {items.map(({ component: Component, id, ...itemProps }) => (
        <Component
          key={id}
          id={id}
          closeParent={close}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...itemProps}
        />
      ))}
    </div>
  );
};

Dropdown.defaultProps = {
  close: () => {},
};

Dropdown.propTypes = {
  close: PropTypes.func,
}

export default Dropdown;
