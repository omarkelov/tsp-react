import { FC, ReactElement, useRef } from 'react';

import { useUpdateEffectOnce } from '../../hooks/effects';


const SLIDE_UP_ANIMATION_DURATION = 300;

const SlideUp: FC<{
    children: ReactElement;
    childRef: React.RefObject<HTMLElement>;
    duration?: number;
    onAnimationFinished?: () => void;
}> = ({ childRef, children, duration, onAnimationFinished }) => {
    const divRef = useRef<HTMLDivElement>(null);

    useUpdateEffectOnce(() => {
        if (!childRef.current || !divRef.current) {
            return;
        }

        const { height } = childRef.current.getBoundingClientRect();
        const { marginTop, marginBottom } = getComputedStyle(childRef.current);

        const animation = divRef.current.animate([
            { height: `${parseInt(marginTop) + height + parseInt(marginBottom)}px` },
            { height: '0' },
        ], duration ?? SLIDE_UP_ANIMATION_DURATION);

        if (onAnimationFinished) {
            animation.onfinish = animation.oncancel = _ => onAnimationFinished(); // eslint-disable-line @typescript-eslint/no-unused-vars
        }

        return () => {
            if (animation.playState !== 'finished') {
                animation.cancel();
            }
        };
    });

    return (
        <div ref={divRef} style={{ overflow: 'hidden' }}>
            {children}
        </div>
    );
};

export default SlideUp;
