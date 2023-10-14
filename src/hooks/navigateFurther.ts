import { useLocation, useNavigate } from 'react-router-dom';


export const useNavigateFurther = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    return (pathPart: string) => navigate(`${pathname}/${pathPart}`);
};
