import { FC, ReactNode } from 'react';



const PageContent: FC<{
    title?: string;
    children?: ReactNode;
}> = ({ title, children }) => {
    return (
        <div>
            {title && <h1>{title}</h1>}
            {children}
        </div>
    );
};

export default PageContent;
