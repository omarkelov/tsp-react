import { FC, ReactNode, useLayoutEffect, useRef, useState } from 'react';

import styles from './Tooltip.module.scss';


const Tooltip: FC<{
    children: ReactNode;
    tooltip: string;
}> = ({ children, tooltip }) => { // TODO: Fix screen overflow
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const [hMargin, setHMargin] = useState<number>(0);

    useLayoutEffect(() => {
        if (tooltipRef.current) {
            const { width } = tooltipRef.current.getBoundingClientRect();
            setHMargin(width / 2);
        }
    }, []);

    return (
        <div className={styles.root}>
            {children}
            <span ref={tooltipRef} className={styles.tooltip} style={{ marginLeft: `-${hMargin}px` }}>
                {tooltip}
            </span>
        </div>

    );
};

export default Tooltip;
