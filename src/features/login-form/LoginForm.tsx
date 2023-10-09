import { FC, useRef } from 'react';

import Button from '../../components/button/Button';
import Form from '../../components/form/Form';
import FormInput from '../../components/form-input/FormInput';
import { useAppDispatch } from '../../store/hooks';
import { loginAsync } from '../../store/slices/authSlice';

import styles from './LoginForm.module.scss';


const LoginForm: FC = () => {
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    const handleLoginClick = () => {
        if (loginRef.current?.value.length && passwordRef.current?.value.length) {
            dispatch(loginAsync({
                login: loginRef.current.value,
                password: passwordRef.current.value,
            }));
        }
    };

    return (
        <Form className={styles.root}>
            <FormInput
                ref={loginRef}
                label='Login'
                type='text' />
            <FormInput
                ref={passwordRef}
                label='Password'
                type='password' />
            <Button
                value='Login'
                onClick={handleLoginClick} />
        </Form>
    );
};

export default LoginForm;
