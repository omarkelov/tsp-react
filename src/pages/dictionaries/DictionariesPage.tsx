import { FC } from 'react';

import DictionariesList from '../../features/dictionaries-list/DictionariesList';
import PageContent from '../../features/page-content/PageContent';
import { useAppTitle } from '../../hooks/title';


const DictionariesPage: FC = () => {
    useAppTitle('Dictionaries');

    return (
        <PageContent title='Dictionaries'>
            <DictionariesList />
        </PageContent>
    );
};

export default DictionariesPage;
