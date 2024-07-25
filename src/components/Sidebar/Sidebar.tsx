import React from 'react';
import {  SidebarElement } from './SidebarElement';
import { SidebarMenuList } from './SidebarMenuList';


export const Sidebar: React.FC = () => {
    return (
        <aside className='sidebar'>
            <ul className="sidebar-menu">
                {SidebarMenuList.map((elementProps, index) => (
                    <SidebarElement key={index} {...elementProps} />
                ))}
            </ul>
        </aside>
    );
};
