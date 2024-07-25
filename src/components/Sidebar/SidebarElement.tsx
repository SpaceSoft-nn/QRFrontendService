import React from 'react';
import { Link } from 'react-router-dom';

export interface ISidebarElementProps {
    text: string;
    icon?: React.ReactNode;
    to: string;
}

export const SidebarElement: React.FC<ISidebarElementProps> = ({ text, icon, to }) => {
    return (
        <li>
            <Link to={to} className='sidebar-element'>
                {icon}
                <p className="sidebar-element-text">
                    {text}
                </p>
            </Link>
        </li>
    );
};