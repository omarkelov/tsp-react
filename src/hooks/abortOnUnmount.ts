import { useCallback, useEffect, useRef } from 'react';


interface Abortable {
    abort: ((reason?: string) => void);
}

export const useAbortOnUnmount = () => {
    const abortableRef = useRef<Abortable | null>(null);

    useEffect(() => () => {
        abortableRef.current?.abort();
    }, []);

    return useCallback((abortable: Abortable) => {
        abortableRef.current = abortable;
    }, []);
};
