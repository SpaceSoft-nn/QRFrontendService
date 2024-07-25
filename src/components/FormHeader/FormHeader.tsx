import React from 'react'
import { BackBtn } from "../../components"

interface FormHeaderProps {
    title: string;
    showBackBtn?: boolean;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, showBackBtn = true }) => {
    return (
        <header className='flex items-center mb-[30px]'>
            {showBackBtn && <BackBtn />}
            <h2 className="text-header mx-auto">{title}</h2>
            <div className="w-[30px]"></div>
        </header>
    )
}