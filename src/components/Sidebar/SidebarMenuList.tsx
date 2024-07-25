import { ReactNode } from "react";
import {
    HelpIcon,
    MainIcon,
    OrdersIcon,
    PaymentHistoryIcon,
    SettingsIcon,
    TerminalIcon
} from "../../assets/Sidebar";

export interface ISidebarMenuItem {
    text: string;
    icon: ReactNode;
    to: string;
}

export const SidebarMenuList: ISidebarMenuItem[] = [
    {
        text: 'Главная',
        icon: <MainIcon />,
        to: "/dashboard",
    },
    {
        text: 'Терминал',
        icon: <TerminalIcon />,
        to: '/dashboard/terminal',
    },
    {
        text: 'Заказы',
        icon: <OrdersIcon />,
        to: '/dashboard/orders',
    },
    {
        text: 'История оплат',
        icon: <PaymentHistoryIcon />,
        to: '/dashboard/payment_history',
    },
    {
        text: 'Настройки',
        icon: <SettingsIcon />,
        to: '/dashboard/settings',
    },
    {
        text: 'Помощь',
        icon: <HelpIcon />,
        to: '/dashboard/help',
    }
]

// export const SidebarMenuListBottom: ISidebarMenuItem[] = [
//     {
//         text: 'Настройки',
//         icon: <SettingsIcon />,
//         to: '/dashboard/settings',
//     },
//     {
//         text: 'Помощь',
//         icon: <HelpIcon />,
//         to: '/dashboard/help',
//     }
// ]
