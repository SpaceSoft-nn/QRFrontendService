import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/formValidationSchema';
import { FormHeader, Button, AuthOptionSelector } from '../../components';
import InputMask from 'react-input-mask';

interface ILoginFormInput {
    tel?: string | null;
    email?: string | null;
    password: string;
}

export const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<ILoginFormInput>({
        resolver: yupResolver<ILoginFormInput>(loginSchema),
    });

    const navigate = useNavigate();
    const [authOption, setAuthOption] = useState<'email' | 'tel'>('email');

    useEffect(() => {
        if (authOption === 'email') {
            setValue('tel', undefined);
            clearErrors('tel');
        } else {
            setValue('email', undefined);
            clearErrors('email');
        }
    }, [authOption, setValue, clearErrors]);

    const onSubmit: SubmitHandler<ILoginFormInput> = data => {
        navigate("/dashboard");
        console.log(data);
    };

    return (
        <div className="centered">
            <form method='post' className='widget w-[400px]' onSubmit={handleSubmit(onSubmit)}>
                <FormHeader title="Вход" />

                <div className="flex flex-col">
                    <AuthOptionSelector setAuthOption={setAuthOption} />

                    {authOption === 'email' ? (
                        <div>
                            <p className="error-message">{errors.email?.message}</p>
                            <input className='form-input mb-[15px]'
                                {...register('email')}
                                type="text"
                                id="email"
                                placeholder='Почта'
                            />
                        </div>

                    ) : (
                        <div>
                            <p className="error-message">{errors.tel?.message}</p>
                            <InputMask className='form-input mb-[15px]'
                                {...register('tel')}
                                mask="+79999999999"
                                id="phone"
                                placeholder='Телефон'
                            >
                            </InputMask>
                        </div>
                    )}
                </div>

                <div>
                    <p className="error-message">{errors.password?.message}</p>
                    <input className='form-input mb-[15px]'
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder='Пароль'
                    />
                </div>

                <span className="inline-block">
                    <Link to="/forgot_password" className='block text-gray-300 my-[15px]'>
                        Забыли пароль?
                    </Link>
                </span>

                <Button type='submit' className="btn-primary mb-[15px]">Войти</Button>
                <Button className="btn-outline" onClick={() => navigate("/register")}>Создать аккаунт</Button>
            </form>
        </div>
    )
}