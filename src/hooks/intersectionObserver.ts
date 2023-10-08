import { useEffect, useRef } from 'react';


export const useIntersectionObserver = <T extends HTMLElement>(onIntersected: () => void) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(([{ isIntersecting }]) => {
            if (isIntersecting) {
                onIntersected();
                intersectionObserver.disconnect();
            }
        });

        if (ref?.current) {
            intersectionObserver.observe(ref.current);
        }

        return () => {
            intersectionObserver.disconnect();
        };
    }, [onIntersected]);

    return ref;
};
