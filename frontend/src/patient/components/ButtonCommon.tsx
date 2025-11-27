import { Button } from '@/components/ui/button';
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
    return (
        <>
            <Button
                className={`${
                    isGoogle
                        ? 'w-full rounded-none flex space-x-2 border-gray-300 hover:bg-gray-200 gap-0 cursor-pointer  active:bg-blue-400 transition-colors duration-500'
                        : 'w-full bg-blue-400 hover:bg-blue-500 transition-colors duration-500 cursor-pointer rounded-none text-white'
                }`}
                size='lg'
                type={type}
                onClick={onClick}
            >
                {isGoogle && <FcGoogle className='text-xl mr-2' />}
                {label}
            </Button>
        </>
    );
}
