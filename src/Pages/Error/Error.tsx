import React from 'react'
import { Link } from 'react-router-dom'

export const Error: React.FC = () => {
    return (
        <div className='centered'>
            <div className="widget text-center sm:justify-start">
                <p className='text-6xl text-header '>404</p>
                <p className="text-3xl text-violet-400 my-[20px]">Страница не найдена</p>
                <Link to='/' className='hover:underline'>Вернуться назад</Link>
            </div>
        </div>
    )
}