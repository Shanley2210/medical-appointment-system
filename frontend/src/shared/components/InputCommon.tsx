import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

interface InputCommonProps {
    lable: string;
    type: string;
    isPhone?: boolean;
    isPassword?: boolean;
}

export default function InputCommon({
    lable,
    type,
    isPhone = false,
    isPassword = false,
    ...props
}: InputCommonProps) {
    const navigate = useNavigate();

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <>
            <div className='space-y-2 select-none'>
                <div className='flex justify-between'>
                    <Label className='text-gray-900'>{lable}</Label>
                    {isPassword && (
                        <Label
                            className='text-blue-600 hover:underline cursor-pointer'
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot password?
                        </Label>
                    )}
                </div>
                <div className='relative'>
                    <Input
                        type={
                            isPassword
                                ? hidePassword
                                    ? 'password'
                                    : 'text'
                                : type
                        }
                        placeholder=''
                        className={`${
                            isPhone ? 'pl-13' : 'pl-4'
                        } border-gray-300 rounded-none focus:outline-none focus-visible:ring-0 focus-visible:border-gray-400`}
                        {...props}
                    />
                    {isPhone && (
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <span className='text-gray-500 flex items-center'>
                                <span className='text-sm border-r pr-2'>
                                    +84
                                </span>
                            </span>
                        </div>
                    )}
                    {isPassword && (
                        <span
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                            onClick={() => setHidePassword(!hidePassword)}
                        >
                            {hidePassword ? (
                                <PiEyeLight />
                            ) : (
                                <PiEyeSlashLight />
                            )}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}
