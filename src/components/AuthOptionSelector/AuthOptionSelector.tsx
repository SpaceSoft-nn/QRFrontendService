import React from 'react';
import { Button } from "../../components";

interface AuthOptionSelectorProps {
    setAuthOption: (option: 'email' | 'tel') => void;
}

export const AuthOptionSelector: React.FC<AuthOptionSelectorProps> = ({ setAuthOption }) => {
    return (
        <div className="flex mb-[20px] outline rounded-lg outline-2 outline-stroke items-center">
            <Button
                onClick={() => setAuthOption('email')}
                className='btn-secondary'>
                Почта
            </Button>
            <Button
                onClick={() => setAuthOption('tel')}
                className='btn-secondary'>
                Телефон
            </Button>
        </div>
    );
};