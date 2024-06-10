import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import {
    HelpIcon,
    MainIcon,
    OrdersIcon,
    PaymentHistoryIcon,
    SettingsIcon,
    TerminalIcon
} from "../../assets/Sidebar";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

interface IDashboardProps {
    children?: React.ReactNode;
}

export const Dashboard: React.FC<IDashboardProps> = ({ children }) => {
    const menu = [
        {
            text: 'Главная',
            icon: <MainIcon />,
            to: "/dashboard",
        },
        {
            text: 'Терминал',
            icon: <TerminalIcon />,
            to: '/dashboard',
        },
        {
            text: 'Заказы',
            icon: <OrdersIcon />,
            to: '/dashboard',
        },
        {
            text: 'История оплат',
            icon: <PaymentHistoryIcon />,
            to: '/dashboard',
        },
        {
            text: 'Настройки',
            icon: <SettingsIcon />,
            to: '/dashboard',
        },
        {
            text: 'Помощь',
            icon: <HelpIcon />,
            to: '/dashboard',
        },
    ]

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-col flex-1">
                <Sidebar buttons={menu} />
                <main className="flex-1">
                    Main
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
}