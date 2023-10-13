import { FC } from 'react';
import { useParams } from 'react-router-dom';

import ContextsList from '../../features/contexts-list/ContextsList';
import PageContent from '../../features/page-content/PageContent';
import { useAppTitle } from '../../hooks/title';


const DictionaryPage: FC = () => {
    const dictionaryName = useParams().name!;

    useAppTitle(dictionaryName);

    return (
        <PageContent title={dictionaryName}>
            <ContextsList dictionaryName={dictionaryName} />
        </PageContent>
    );
};

export default DictionaryPage;
