import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PiEyeLight } from 'react-icons/pi';
//PiEyeSlashLight

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
    isPassword = false
}: InputCommonProps) {
    return (
        <>
            <div className='space-y-2'>
                <Label className='text-gray-900'>{lable}</Label>
                <div className='relative'>
                    <Input
                        type={type}
                        placeholder=''
                        className={`${
                            isPhone ? 'pl-13' : 'pl-4'
                        } border-gray-300 rounded-none focus:outline-none focus-visible:ring-0 focus-visible:border-gray-400`}
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
                        <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'>
                            <PiEyeLight />
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}
