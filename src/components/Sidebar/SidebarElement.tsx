import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom

export interface ISidebarElementProps {
    text: string;
    icon?: React.ReactNode;
    to: string; // Добавляем пропс 'to' для указания пути
}

export const SidebarElement: React.FC<ISidebarElementProps> = ({ text, icon, to }) => {
    return (
        <Link to={to} className='sidebar-element'>
            {icon}
            <p className="sidebar-element-text">
                {text}
            </p>
        </Link>
    );
};