import { FC } from 'react';

import PageContent from '../../features/page-content/PageContent';
import { useAppTitle } from '../../hooks/title';


const DictionariesPage: FC = () => {
    useAppTitle('Dictionaries');

    return (
        <PageContent title='Dictionaries'>
            DictionariesPage
        </PageContent>
    );
};

export default DictionariesPage;
