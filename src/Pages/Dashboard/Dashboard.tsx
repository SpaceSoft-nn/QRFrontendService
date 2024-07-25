import React from "react";
import { DashboardLayout } from "../../components";
import { Outlet } from "react-router-dom";

export const Dashboard: React.FC = () => {
    return (
        <DashboardLayout>
            <Outlet/>
        </DashboardLayout>
    )
}