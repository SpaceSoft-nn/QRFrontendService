import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackIcon from '../../assets/back.svg';
import { Button } from '../Button/Button';

export const BackBtn: React.FC = () => {
    const navigate = useNavigate();
    const goback = () => navigate(-1);

    return (
        <Button onClick={goback}>
            <img src={BackIcon} alt="Назад" className='w-[30px]'/>
        </Button>
    )
}