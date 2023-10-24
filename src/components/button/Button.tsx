import { FC } from 'react';

import { combineClassNames } from '../../util/classNames';

import styles from './Button.module.scss';


type Variant = 'primary' | 'secondary';

const classNameByVariant: {
    [key in Variant]: string;
} = {
    'primary': styles.mButtonPrimary,
    'secondary': styles.mButtonSecondary,
};

const Button: FC<{
    value: string;
    variant?: Variant;
    isDisabled?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ value, variant = 'primary', isDisabled, className, onClick }) => (
    <button
        className={combineClassNames(styles.button, classNameByVariant[variant], className)}
        disabled={isDisabled}
        onClick={onClick}
    >
        {value}
    </button>
);

export default Button;
