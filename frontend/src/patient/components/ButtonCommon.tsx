import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';

interface IButtonCommonProps {
    label: string;
    isGoogle?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonCommon({
    label,
    type = 'button',
    isGoogle = false,
    onClick
}: IButtonCommonProps) {
    const { isDark } = useContext(ThemeContext);

    return (
        <Button
            className={`
                w-full rounded-none transition-colors duration-500 cursor-pointer
                ${
                    isGoogle
                        ? `
                        flex space-x-2 gap-0 border 
                        ${
                            isDark
                                ? 'border-gray-600 hover:bg-gray-700'
                                : 'border-gray-300 hover:bg-gray-200'
                        }
                      `
                        : `
                        text-white 
                        ${
                            isDark
                                ? 'bg-blue-500 hover:bg-blue-600'
                                : 'bg-blue-400 hover:bg-blue-500'
                        }
                      `
                }
            `}
            size='lg'
            type={type}
            onClick={onClick}
        >
            {isGoogle && <FcGoogle className='text-xl mr-2' />}
            {label}
        </Button>
    );
}
