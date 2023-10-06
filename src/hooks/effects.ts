import { EffectCallback, useEffect, useState } from 'react';


export const useUpdateEffectOnce = (effect: EffectCallback) => {
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        setTrigger(true);
    }, [setTrigger]);

    useEffect(() => trigger ? effect() : undefined, [trigger, effect]);
};
