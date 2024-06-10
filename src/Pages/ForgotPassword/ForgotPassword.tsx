import React, { useState } from 'react'
import FormHeader from '../../components/FormHeader'
import Button from '../../components/Button'
import AuthOptionSelector from '../../components/AuthOptionSelector/AuthOptionSelector'
import InputMask from 'react-input-mask';

export const ForgotPassword: React.FC = () => {
    const [authOption, setAuthOption] = useState<'email' | 'tel'>('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    return (
        <div className="centered">
            <form method='POST' className="widget w-[400px]">
                <FormHeader title="Восстановление" />
                <AuthOptionSelector setAuthOption={setAuthOption} />
                {authOption === 'email' ? (
                    <input className='form-input mb-[15px]'
                        type="email"
                        id="email"
                        placeholder='Почта'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                ) : (
                    <InputMask
                        mask="+79999999999"
                        className='form-input mb-[15px]'
                        value={phone}
                        onChange={handlePhoneNumberChange}
                        placeholder='Телефон'
                        required
                    >
                    </InputMask>
                )}
                <Button type='submit' className="btn-primary">Отправить код</Button>
            </form>
        </div>
    )
}
