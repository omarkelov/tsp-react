import { FC, ReactNode } from 'react';


const Form: FC<{
    className?: string;
    children?: ReactNode;
}> = ({ className, children }) => {
    return (
        <form className={className} onSubmit={e => e.preventDefault()}>
            {children}
        </form>
    );
};

export default Form;
