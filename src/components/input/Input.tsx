import { FC, forwardRef, RefAttributes } from 'react';

import { combineClassNames } from '../../util/classNames';

import styles from './Input.module.scss';


const Input: FC<{
    label: string;
    type?: React.HTMLInputTypeAttribute;
    isDisabled?: boolean;
    className?: string;
} & RefAttributes<HTMLInputElement>> = forwardRef(({ label, type, isDisabled, className }, ref) => (
    <input
        ref={ref}
        className={combineClassNames(styles.input, className)}
        type={type}
        placeholder={label}
        disabled={isDisabled}
    />
));

export default Input;
