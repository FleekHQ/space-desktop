import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputTooltip, { Requirement } from '@ui/InputTooltip';

const PasswordCheckTooltip = ({
  open,
  password,
  children,
  bgColor,
  tooltipPlacement,
}) => {
  const { t } = useTranslation();

  return (
    <InputTooltip
      type="info"
      bgColor={bgColor}
      title={t('modules.shared.passwordCheck.title')}
      tooltip={{
        open,
        arrow: true,
        placement: tooltipPlacement,
      }}
      requirements={(
        <>
          <Requirement
            isCorrect={/[0-9]/.test(password)}
            requirement={t('modules.shared.passwordCheck.requirements.number')}
          />
          <Requirement
            isCorrect={/[A-Z]/.test(password)}
            requirement={t('modules.shared.passwordCheck.requirements.upperCase')}
          />
          <Requirement
            isCorrect={/[a-z]/.test(password)}
            requirement={t('modules.shared.passwordCheck.requirements.lowerCase')}
          />
          <Requirement
            isCorrect={/[\W]/.test(password)}
            requirement={t('modules.shared.passwordCheck.requirements.specialChar')}
          />
          <Requirement
            isCorrect={/.{8,}/.test(password)}
            requirement={t('modules.shared.passwordCheck.requirements.charLength')}
          />
        </>
      )}
    >
      {children}
    </InputTooltip>
  );
};

PasswordCheckTooltip.defaultProps = {
  open: false,
  password: '',
  bgColor: 'primary',
  tooltipPlacement: 'right-start',
};

PasswordCheckTooltip.propTypes = {
  open: PropTypes.bool,
  bgColor: PropTypes.string,
  password: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PasswordCheckTooltip;
