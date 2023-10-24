import { FC, ReactNode } from 'react';

import styles from './PageContent.module.scss';


const PageContent: FC<{
    title?: ReactNode;
    children?: ReactNode;
}> = ({ title, children }) => (
    <div>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
    </div>
);

export default PageContent;
