import React from 'react'
import { Link } from 'react-router-dom'

export const Error: React.FC = () => {
    return (
        <div className='centered'>
            <div className="md:widget text-center sm:justify-start">
                <p className='text-6xl text-header '>404</p>
                <p className="text-3xl text-violet-400">Страница не найдена</p>
                <Link to=''>Вернуться назад</Link>
            </div>
        </div>
    )
}