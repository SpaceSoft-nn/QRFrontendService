import React from "react";
import {
    Header,
    Footer,
    Sidebar
} from "../../components";

interface IDashboardLayoutProps {
    children: React.ReactNode
}

export const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-auto justify-between mt-[67px]">
                <Sidebar />
                <div className="md:ml-[250px] ml-[63px] flex flex-col flex-auto">
                    <main className="dashboard-content flex-1 p-[20px] bg-gradient bg-cover">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}