import { FC } from 'react';

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
}> = ({size = 'medium', className}) => (
    <div className={combineClassNames(styles.spinner, classNameBySize[size], className)}></div>
);

export default Spinner;
