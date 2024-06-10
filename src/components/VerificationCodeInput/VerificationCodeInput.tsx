import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import * as yup from 'yup'; // Импортируем yup для валидации

interface IVerificationCodeInputProps {
    className?: string;
}

const VerificationCodeInput: React.FC<IVerificationCodeInputProps> = ({className}) => {
    const [inputs, setInputs] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const validationSchema = yup.string().required().matches(/^\d$/, 'Введите цифру');

    const handleChange = async (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value && !/^\d$/.test(value)) {
            return; 
        }

        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);

        try {
            await validationSchema.validate(value);
            if (index < 5 && value) {
                inputRefs.current[index + 1].focus();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && !inputs[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData('text').slice(0, 6).split('');
        if (pasteData.length === 6 && pasteData.every(char => /d/.test(char))) {
            setInputs(pasteData);
            inputRefs.current[5].focus();
        }
    };

    return (
        <div onPaste={handlePaste} className={`flex gap-[10px]`}>
            {inputs.map((value, index) => (
                <input
                    key={index}
                    ref={el => inputRefs.current[index] = el!} 
                    type="tel" 
                    maxLength={1}
                    value={value}
                    className={className}
                    onChange={event => handleChange(index, event)}
                    onKeyDown={event => handleKeyDown(index, event)}
                    pattern="\d*"
                />
            ))}
        </div>
    );
};

export default VerificationCodeInput;