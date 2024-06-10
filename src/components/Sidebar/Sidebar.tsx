import React from 'react';
import { ISidebarElementProps, SidebarElement } from './SidebarElement';

interface ISidebarProps {
    buttons: ISidebarElementProps[];
}

export const Sidebar: React.FC<ISidebarProps> = ({ buttons }) => {
    return (
        <aside className='sidebar flex flex-col items-center gap-[10px] p-[10px]'>
            {buttons.map((elementProps, index) => (
                <SidebarElement key={index} {...elementProps} />
            ))}
        </aside>
    );
};
