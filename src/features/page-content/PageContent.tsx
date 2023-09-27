import { FC, ReactNode } from 'react';

import styles from './PageContent.module.scss';



const PageContent: FC<{
    title?: string;
    children?: ReactNode;
}> = ({ title, children }) => {
    return (
        <div>
            {title && <h1 className={styles.title}>{title}</h1>}
            {children}
        </div>
    );
};

export default PageContent;
