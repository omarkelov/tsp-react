import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../../components/spinner/Spinner';
import PageContent from '../../features/page-content/PageContent';
import Test from '../../features/test/Test';
import { useAbortOnUnmount } from '../../hooks/abortOnUnmount';
import { useAppTitle } from '../../hooks/title';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTestAsync, initialize, selectDictionaryName, selectHasPhrasesIds } from '../../store/slices/testSlice';

import styles from './TestPage.module.scss';


const TestPage: FC = () => {
    const dictionaryName = useParams().name!;
    const title = `Test: "${dictionaryName}"`;

    useAppTitle(title);

    const dispatch = useAppDispatch();

    const savedDictionaryName = useAppSelector(selectDictionaryName);
    // const testStatus = useAppSelector(selectTestStatus); // TODO: handle failed status
    const hasPhrasesIds = useAppSelector(selectHasPhrasesIds);

    const setAbortCallback = useAbortOnUnmount();

    useEffect(() => {
        if (dictionaryName !== savedDictionaryName) {
            dispatch(initialize(dictionaryName));
        } else if (!hasPhrasesIds) {
            setAbortCallback(dispatch(getTestAsync()));
        }
    }, [dictionaryName, savedDictionaryName, hasPhrasesIds, dispatch, setAbortCallback]);

    const titleNode = (
        <>
            Test: "{
                <Link
                    className={styles.titleLink}
                    to='..'
                    relative='path'
                >
                    {dictionaryName}
                </Link>
            }"
        </>
    );

    return (
        <PageContent title={titleNode}>
            {dictionaryName === savedDictionaryName && hasPhrasesIds ? (
                <Test />
            ) : (
                <Spinner
                    className={styles.spinner}
                    size='large'
                />
            )}
        </PageContent>
    );
};

export default TestPage;
