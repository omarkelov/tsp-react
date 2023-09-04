import { FC, forwardRef, RefAttributes } from 'react';

import { combineClassNames } from '../../util/classNames';

import styles from './Input.module.scss';


const Input: FC<{
    label: string;
    type?: React.HTMLInputTypeAttribute;
    className?: string;
} & RefAttributes<HTMLInputElement>> = forwardRef(({ label, type, className }, ref) => (
    <input
        ref={ref}
        className={combineClassNames(styles.input, className)}
        type={type}
        placeholder={label}
    />
));

export default Input;
