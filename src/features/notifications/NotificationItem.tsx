import { FC, memo, useState } from 'react';
import { useInterval } from 'usehooks-ts';

import { useAppDispatch } from '../../store/hooks';
import { deleteNotification, Notification, NotificationType } from '../../store/slices/notificationsSlice';
import { combineClassNames } from '../../util/classNames';

import styles from './NotificationItem.module.scss';


const NOTIFICATION_EXPIRATION_TIME = 15;

const notificationClassNameByType: {
    [key in NotificationType]: string;
} = {
    'error': styles.mNotificationError,
    'warning': styles.mNotificationWarning,
    'info': styles.mNotificationInfo,
};

const NotificationItem: FC<{
    notification: Notification;
    isCountingDown: boolean;
}> = memo(({ notification: { id, type, message }, isCountingDown }) => {
    const dispatch = useAppDispatch();
    const [countdown, setCountdown] = useState<number>(NOTIFICATION_EXPIRATION_TIME);

    const closeNotification = () => dispatch(deleteNotification(id));

    useInterval(() => {
        if (countdown > 1) {
            setCountdown(countdown - 1);
        } else {
            closeNotification();
        }
    }, isCountingDown ? 1000 : null);

    return (
        <li className={combineClassNames(styles.notification, notificationClassNameByType[type])}>
            <div className={styles.controls}>
                <div className={styles.type}>
                    {type}
                </div>
                <div className={styles.countdown}>
                    {countdown}
                </div>
                <div className={styles.close} onClick={() => setTimeout(() => closeNotification(), 100)}>
                    <span className={styles.closeSymbol}>
                        {'\u2a2f'}
                    </span>
                </div>
            </div>
            <div className={styles.message}>
                {message}
            </div>
        </li>
    );
});

export default NotificationItem;
