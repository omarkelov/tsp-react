import { FC, forwardRef, RefAttributes } from 'react';

import { combineClassNames } from '../../util/classNames';
import Input from '../input/Input';

import styles from './FormInput.module.scss';


const FormInput: FC<{
    label: string;
    type?: React.HTMLInputTypeAttribute;
    className?: string;
} & RefAttributes<HTMLInputElement>> = forwardRef(({ label, type, className }, ref) => (
    <section className={styles.root}>
        <label>{label}:</label>
        <Input
            ref={ref}
            label={label}
            type={type}
            className={combineClassNames(styles.eInput, className)}
        />
    </section>
));

export default FormInput;
