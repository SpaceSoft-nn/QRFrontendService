import React from 'react';
import { Logo, Button } from "../../components"
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className='header'>
            <Logo />

            <nav className="hidden md:block">
                <ul className="flex">
                    <li><a href="#" className="px-4">Главная</a></li>
                    <li><a href="#" className="px-4">О нас</a></li>
                    <li><a href="#" className="px-4">Помощь</a></li>
                </ul>
            </nav>

            <div className="auth hidden md:block">
                <Button
                    type='button'
                    className='btn-primary px-[20px]'
                    onClick={() => navigate("/login")}>
                    Войти
                </Button>
            </div>
        </header >
    );
};