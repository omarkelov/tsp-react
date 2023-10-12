import { FC, useRef } from 'react';
import { useHover } from 'usehooks-ts';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteAllNotifications, selectNotifications } from '../../store/slices/notificationsSlice';

import NotificationItem from './NotificationItem';
import styles from './NotificationsList.module.scss';


const List: FC = () => {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(selectNotifications);

    const notificationsRef = useRef<HTMLDivElement>(null);
    const isHover = useHover(notificationsRef);

    return (
        <div ref={notificationsRef} className={styles.root}>
            <ul className={styles.notifications}>
                {notifications.map(notification => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        isCountingDown={!isHover}
                    />
                ))}
            </ul>
            {notifications.length > 1 && (
                <span
                    className={styles.closeAll}
                    onClick={() => dispatch(deleteAllNotifications())}
                >
                    Close All
                </span>
            )}
        </div>
    );
};

// This wrapper is needed to make <List/> unmount (for clearing listeners inside hover effect),
// otherwise listeners are not cleared when the last remaining notification is closed on click.
const NotificationsList: FC = () => {
    const notifications = useAppSelector(selectNotifications);

    return (
        <>
            {!!notifications.length && <List />}
        </>
    );
};

export default NotificationsList;
