import React from 'react'
import { Link } from 'react-router-dom'

interface ILogoProps {
    className?: string;
}

export const Logo: React.FC<ILogoProps> = ({ className}) => {
    return (
        <div className={`logo ${className}`}>
            <Link to="/" replace className='text-header'>
                QR
                <span className='text-[20px] uppercase from-accent-light to-accent-darken'>
                    service
                </span>
            </Link>
        </div>
    )
}