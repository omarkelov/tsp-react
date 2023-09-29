import { FC, forwardRef, RefAttributes } from 'react';

import { combineClassNames } from '../../util/classNames';

import styles from './Spinner.module.scss';


type Size = 'small' | 'medium' | 'large';

const classNameBySize: {
    [key in Size]: string;
} = {
    'small': styles.mSpinnerSmall,
    'medium': styles.mSpinnerMedium,
    'large': styles.mSpinnerLarge,
};

const Spinner: FC<{
    size?: Size;
    className?: string;
} & RefAttributes<HTMLDivElement>> = forwardRef(({ size = 'medium', className }, ref) => (
    <div
        ref={ref}
        className={combineClassNames(styles.spinner, classNameBySize[size], className)}
    />
));

export default Spinner;
