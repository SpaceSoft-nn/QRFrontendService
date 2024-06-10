import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    children: React.ReactNode;
    setActiveState?: (value: boolean) => void;
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type = "button", className, children, isLoading, icon }) => {

    return (
        <button
            type={type}
            className={` ${className} font-semibold rounded-[10px]`}
            onClick={onClick}
            disabled={isLoading}
        >
            {/* {isLoading ? <Spinner/>: children} */}
            {icon}
            {children}
        </button>
    );
};

export default Button;
