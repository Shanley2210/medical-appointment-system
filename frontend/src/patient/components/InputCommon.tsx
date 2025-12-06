import { forwardRef, useContext, useState } from 'react';
import { Label } from '@/components/ui/label';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

interface InputCommonProps {
    lable: string;
    type: string;
    isPhone?: boolean;
    isPassword?: boolean;
}

const InputCommon = forwardRef<HTMLInputElement, InputCommonProps>(
    ({ lable, type, isPhone = false, isPassword = false, ...props }, ref) => {
        const [hidePassword, setHidePassword] = useState(true);
        const { isDark } = useContext(ThemeContext);

        return (
            <div className='space-y-2'>
                <Label
                    className={`${isDark ? 'text-gray-200' : 'text-gray-900'}`}
                >
                    {lable}
                </Label>

                <div className='relative'>
                    <input
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
                            h-10 w-full rounded-none 
                            border 
                            ${
                                isDark
                                    ? 'border-gray-600 bg-gray-800 text-white'
                                    : 'border-gray-300 bg-white text-black'
                            }
                            focus:outline-none 
                            focus-visible:ring-0 
                            ${
                                isDark
                                    ? 'focus-visible:border-gray-500'
                                    : 'focus-visible:border-gray-400'
                            }
                        `}
                        {...props}
                        ref={ref}
                    />

                    {isPhone && (
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <span
                                className={`${
                                    isDark ? 'text-gray-400' : 'text-gray-500'
                                } flex items-center`}
                            >
                                <span className='text-sm border-r pr-2 border-gray-500'>
                                    +84
                                </span>
                            </span>
                        </div>
                    )}

                    {isPassword && (
                        <span
                            className={`
                                absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer
                                ${isDark ? 'text-gray-300' : 'text-gray-400'}
                            `}
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

export default InputCommon;
