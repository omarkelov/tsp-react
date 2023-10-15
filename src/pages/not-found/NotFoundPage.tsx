import { FC } from 'react';

import PageContent from '../../features/page-content/PageContent';
import { useAppTitle } from '../../hooks/title';


const NotFoundPage: FC = () => {
    useAppTitle('404 Not Found');

    return (
        <PageContent title='404 Not Found' />
    );
};

export default NotFoundPage;
