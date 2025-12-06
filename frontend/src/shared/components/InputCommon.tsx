import { Label } from '@/components/ui/label';
import { useState, forwardRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

interface InputCommonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    lable: string;
    isPhone?: boolean;
    isPassword?: boolean;
}

const InputCommon = forwardRef<HTMLInputElement, InputCommonProps>(
    (
        {
            lable,
            type,
            isPhone = false,
            isPassword = false,
            className,
            ...props
        },
        ref
    ) => {
        const navigate = useNavigate();
        const [hidePassword, setHidePassword] = useState(true);
        const { t } = useTranslation();
        const { isDark } = useContext(ThemeContext);

        return (
            <div className='space-y-2 select-none'>
                <div className='flex justify-between'>
                    <Label
                        className={isDark ? 'text-gray-200' : 'text-gray-900'}
                    >
                        {lable}
                    </Label>

                    {isPassword && (
                        <Label
                            className='text-blue-600 hover:underline cursor-pointer'
                            onClick={() => navigate('/forgot-password')}
                        >
                            {t('login.fp')}
                        </Label>
                    )}
                </div>

                <div className='relative'>
                    <input
                        ref={ref}
                        type={
                            isPassword
                                ? hidePassword
                                    ? 'password'
                                    : 'text'
                                : type
                        }
                        placeholder=''
                        className={`
                            ${isPhone ? 'pl-13' : 'pl-4'}
                            h-10 w-full rounded-none border  
                            focus:outline-none focus-visible:ring-0
                            transition-colors duration-300
                            ${
                                isDark
                                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus-visible:border-gray-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus-visible:border-gray-400'
                            }
                            ${className || ''}
                        `}
                        {...props}
                    />

                    {isPhone && (
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <span
                                className={
                                    isDark
                                        ? 'text-gray-400 border-r pr-2 text-sm'
                                        : 'text-gray-500 border-r pr-2 text-sm'
                                }
                            >
                                +84
                            </span>
                        </div>
                    )}

                    {isPassword && (
                        <span
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
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
        );
    }
);

InputCommon.displayName = 'InputCommon';

export default InputCommon;
