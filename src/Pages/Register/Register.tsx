import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationSchema } from '../../utils/formValidationSchema';
import AuthOptionSelector from '../../components/AuthOptionSelector/AuthOptionSelector';
import FormHeader from '../../components/FormHeader'
import Button from '../../components/Button'

interface IRegisterFormInput {
    tel?: string | null;
    email?: string | null;
    password: string;
    passwordConfirm: string;
    terms: boolean;
}

export const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<IRegisterFormInput>({
        resolver: yupResolver(registrationSchema),
    });

    const [authOption, setAuthOption] = useState<'email' | 'tel'>('email');

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IRegisterFormInput> = data => {
        navigate("/register_verify");
        console.log(data);
    };

    useEffect(() => {
        if (authOption === 'email') {
          setValue('tel', undefined);
          clearErrors('tel'); 
        } else {
          setValue('email', undefined); 
          clearErrors('email'); 
        }
      }, [authOption, setValue, clearErrors]);

    return (
        <div className='centered'>
            <form method='POST' className="widget w-[400px]" onSubmit={handleSubmit(onSubmit)}>
                <FormHeader title="Регистрация" />
                <div className="flex flex-col">
                    <AuthOptionSelector setAuthOption={setAuthOption} />

                    {authOption === 'email' ? (
                        <div>
                            <p className="error-message">{errors.email?.message}</p>
                            <input
                                className='form-input mb-[15px]'
                                {...register('email', { required: "Это поле обязательно" })}
                                type="text"
                                id="email"
                                placeholder='Почта'
                            />
                        </div>
                    ) : (
                        <div>
                            <p className="error-message">{errors.tel?.message}</p>
                            <InputMask
                                className='form-input mb-[15px]'
                                {...register('tel', { required: "Это поле обязательно" })}
                                mask="+79999999999"
                                id="phone"
                                placeholder='Телефон'
                            />
                        </div>
                    )}
                </div>

                <div>
                    <p className="error-message">{errors.password?.message}</p>
                    <input className='form-input mb-[15px]'
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder='Придумайте пароль'
                    />
                </div>

                <div>
                    <p className="error-message">{errors.passwordConfirm?.message}</p>
                    <input className='form-input mb-[20px]'
                        {...register("passwordConfirm")}
                        type="password"
                        id="passwordConfirm"
                        placeholder='Повторите пароль'
                    />
                </div>

                <div className="flex items-center mb-[15px] gap-[5px]">
                    <div className='gap-[5px]'>
                        <p className="error-message">{errors.terms?.message}</p>
                        <input className='w-4 h-4 border border-stroke bg-widget accent-accent-main outline-none'
                            {...register("terms")}
                            type="checkbox"
                            id="terms"
                            aria-describedby='terms'
                        />
                        <label htmlFor="terms" className=' text-gray-300 text-[14px] cursor-pointer'>
                            Я принимаю <a href="/#" className='underline'>условия использования</a>
                        </label>
                    </div>
                </div>

                <Button type='submit' className="btn-primary mb-[15px]">Зарегистрироваться</Button>
                <Button className="btn-outline" onClick={() => navigate("/login")}>Уже есть аккаунт</Button>
            </form>
        </div>
    )
}