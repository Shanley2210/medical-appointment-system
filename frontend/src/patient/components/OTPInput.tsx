import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';

interface OTPInputProps {
    length?: number;
    onChange?: (value: string) => void;
}

export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
    const [values, setValues] = useState(Array(length).fill(''));
    const refs = useRef<HTMLInputElement[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newValues = [...values];
        newValues[index] = value.slice(-1);
        setValues(newValues);

        if (value && index < length - 1) {
            refs.current[index + 1]?.focus();
        }

        onChange?.(newValues.join(''));
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            refs.current[index - 1]?.focus();
        }
    };
    return (
        <div className='flex gap-2 justify-center'>
            {values.map((val, index) => (
                <Input
                    key={index}
                    ref={(el) => {
                        if (el) refs.current[index] = el;
                    }}
                    value={val}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className='w-12 h-12 text-center text-xl font-semibold rounded-none border-gray-300 focus:outline-none focus-visible:ring-0 focus-visible:border-gray-400'
                    maxLength={1}
                />
            ))}
        </div>
    );
}
