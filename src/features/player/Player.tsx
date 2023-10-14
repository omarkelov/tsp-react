import { FC, useCallback, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addNotification } from '../../store/slices/notificationsSlice';
import { closePlayer, selectLink } from '../../store/slices/playerSlice';

import styles from './Player.module.scss';


const Player: FC = () => {
    const dispatch = useAppDispatch();
    const link = useAppSelector(selectLink);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleError = useCallback((_: Event) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        dispatch(addNotification({
            id: crypto.randomUUID(),
            type: 'error',
            message: 'Could not download the video.',
        }));
    }, [dispatch]);

    useEffect(() => {
        if (link) {
            document.body.style.overflow = 'hidden';
        }

        const videoElem = videoRef.current;

        videoElem?.play();
        videoElem?.addEventListener('error', handleError);

        return () => {
            if (link) {
                document.body.style.overflow = 'unset';
            }

            videoElem?.removeEventListener('error', handleError);
        };
    }, [link, handleError]);

    if (!link) {
        return null;
    }

    return (
        <div className={styles.root}>
            <video
                ref={videoRef}
                className={styles.video}
                src={link}
                controls
                crossOrigin='use-credentials'
            />
            <div
                className={styles.closePlayerButton}
                onClick={() => dispatch(closePlayer())}
            />
        </div>
    );
};

export default Player;
