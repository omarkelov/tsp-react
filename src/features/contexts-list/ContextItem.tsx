import { FC, memo, useRef } from 'react';
import { Link } from 'react-router-dom';

import SlideUp from '../../components/slide-up/SlideUp';
import { useAppDispatch } from '../../store/hooks';
import { deleteContext, deleteContextAsync } from '../../store/slices/contextsSlice';
import { combineClassNames } from '../../util/classNames';
import { Context } from '../../util/types';

import styles from './ContextItem.module.scss';


const ContextItem: FC<{
    context: Context;
    isDeleting: boolean;
    isDeleted: boolean;
}> = memo(({ context, isDeleting, isDeleted }) => {
    const dispatch = useAppDispatch();
    const liRef = useRef<HTMLLIElement>(null);

    const handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this context?')) {
            dispatch(deleteContextAsync(context.id));
        }
    };

    const liElement = (
        <li
            ref={liRef}
            className={combineClassNames(styles.context, (isDeleting || isDeleted) && styles.mContextDeleting)}
        >
            <Link
                className={styles.link}
                to={`/contexts/${context.id}`}
            >
                {context.context}
            </Link>
            <div
                className={styles.removeButton}
                onClick={handleDeleteClick}
            />
        </li>
    );

    if (!isDeleted) {
        return liElement;
    }

    return (
        <SlideUp
            childRef={liRef}
            onAnimationFinished={() => dispatch(deleteContext(context.id))}
        >
            {liElement}
        </SlideUp>
    );
});

export default ContextItem;
