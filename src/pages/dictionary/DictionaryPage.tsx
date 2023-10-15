import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/button/Button';
import ContextsList from '../../features/contexts-list/ContextsList';
import PageContent from '../../features/page-content/PageContent';
import { useAbortOnUnmount } from '../../hooks/abortOnUnmount';
import { useNavigateFurther } from '../../hooks/navigateFurther';
import { useAppTitle } from '../../hooks/title';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPhrasesCountAsync, initialize, selectDictionaryName, selectPhrasesCount } from '../../store/slices/contextsSlice';

import styles from './DictionaryPage.module.scss';


const DictionaryPage: FC = () => {
    const navigateFurther = useNavigateFurther();

    const dictionaryName = useParams().name!;

    useAppTitle(dictionaryName);

    const dispatch = useAppDispatch();

    const savedDictionaryName = useAppSelector(selectDictionaryName);
    const phrasesCount = useAppSelector(selectPhrasesCount);

    const setAbortCallback = useAbortOnUnmount();

    useEffect(() => {
        if (dictionaryName !== savedDictionaryName) {
            dispatch(initialize(dictionaryName));
        } else if (!phrasesCount) {
            setAbortCallback(dispatch(getPhrasesCountAsync()));
        }
    }, [dictionaryName, savedDictionaryName, phrasesCount, dispatch, setAbortCallback]);

    return (
        <PageContent title={dictionaryName}>
            {!!phrasesCount && (
                <div className={styles.header}>
                    <h4 className={styles.phrasesCount}>
                        {`(${phrasesCount} phrases)`}
                    </h4>
                    <Button
                        value='Test'
                        className={styles.testButton}
                        onClick={() => navigateFurther('test')}
                    />
                </div>
            )}
            <ContextsList />
        </PageContent>
    );
};

export default DictionaryPage;
