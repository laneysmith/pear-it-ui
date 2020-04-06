import React, { memo } from 'react';
import cn from 'classnames';

enum ButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

interface IButtonProps {
  id: string;
  value?: string;
  children: string | React.ReactNode;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  disabled?: boolean;
  type?: ButtonTypes;
  className?: string;
}

const Button: React.SFC<IButtonProps> = ({
  id,
  value,
  children,
  onClick,
  disabled,
  type = ButtonTypes.BUTTON,
  className,
}) => (
  <button
    id={id}
    type={type}
    className={cn('btn', className, {
      'btn--disabled': disabled,
      'btn--large': type === 'submit',
    })}
    value={value}
    // aria-pressed={selected}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Button.defaultProps = {
//   type: ButtonTypes.BUTTON,
// };

export default memo(Button);
