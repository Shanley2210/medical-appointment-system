import { Card, CardContent } from '@/components/ui/card';
import InputCommon from '../components/InputCommon';
import ButtonCommon from '../components/ButtonCommon';
import OTPInput from '../components/OTPInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { resendOtp, resetPassword } from '@/shared/apis/authService';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { useForm } from 'react-hook-form';

interface RegisterForm {
    newPassword: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const location = useLocation();
    const emailLocation = location.state?.email;
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [verifyTime, setVerifyTime] = useState(180);
    const [cooldown, setCooldown] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const { register, handleSubmit } = useForm<RegisterForm>();
    const navigate = useNavigate();

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleResend = async () => {
        if (cooldown > 0) return;
        setCooldown(60);
        setVerifyTime(180);

        const dataResend = {
            email: emailLocation
        };

        try {
            setIsLoading(true);

            const res = await resendOtp(dataResend);

            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            console.error('Error submitting form:', e);

            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };
    const onSubmit = async (data: RegisterForm) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu không khớp'
                    : 'Password does not match'
            );
            return;
        }
        if (data.newPassword.length < 6 || data.confirmPassword.length < 6) {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu phải có ít nhất 6 ký tự'
                    : 'Password must have at least 6 characters'
            );
            return;
        }
        const dataResetPassword = {
            emailOrPhone: emailLocation,
            otp: otp,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmPassword
        };

        try {
            setIsLoading(true);

            localStorage.removeItem('refreshToken');

            const res = await resetPassword(dataResetPassword);

            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );

                navigate('/login', {
                    replace: true
                });
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            console.error('Error submitting form:', e);

            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }

        console.log(dataResetPassword);
    };
    const onError = (errors: any) => {
        if (
            errors.newPassword?.type === 'required' ||
            errors.confirmPassword?.type === 'required'
        ) {
            toast.error(
                language === 'vi'
                    ? 'Không được để trống các trường dữ liệu'
                    : 'Fields cannot be empty'
            );
            return;
        }
    };

    useEffect(() => {
        if (cooldown === 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);
    useEffect(() => {
        const timer = setInterval(() => {
            setVerifyTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='min-h-screen bg-white flex lg:flex-row items-center justify-center sm:p-4'>
            <div className='w-full max-w-md lg:w-1/2 lg:max-w-lg p-2 sm:p-4'>
                <Card className='shadow-none border-gray-400 rounded-none'>
                    <CardContent className='p-5'>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800 text-center'>
                                {t('resetPassword.tt')}
                            </h2>

                            <h4 className='mt-7 text-center'>
                                {t('resetPassword.st')}
                            </h4>

                            <h2 className='mt-2 text-center font-bold'>
                                {emailLocation}
                            </h2>
                        </div>

                        <form
                            className='space-y-4'
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <OTPInput
                                length={6}
                                onChange={(otp) => setOtp(otp)}
                            />

                            <div className='text-gray-900 text-center font-medium mb-4 text-'>
                                {t('resetPassword.ti')}
                                <span className='text-blue-600 font-medium '>
                                    {formatTime(verifyTime)}
                                </span>
                            </div>

                            <InputCommon
                                lable={t('resetPassword.np')}
                                type='password'
                                isPassword={true}
                                {...register('newPassword', { required: true })}
                            />

                            <InputCommon
                                lable={t('resetPassword.cp')}
                                type='password'
                                isPassword={true}
                                {...register('confirmPassword', {
                                    required: true
                                })}
                            />

                            <ButtonCommon
                                label={t('resetPassword.rp')}
                                type='submit'
                            />
                        </form>
                        <div className='text-center mt-6 text-sm'>
                            {t('resetPassword.kn')}
                            <span
                                className={`text-blue-600 font-medium hover:underline cursor-pointer ${
                                    cooldown > 0
                                        ? 'pointer-events-none opacity-40'
                                        : ''
                                }`}
                                onClick={handleResend}
                            >
                                {cooldown > 0
                                    ? formatTime(cooldown)
                                    : t('resetPassword.re')}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='lg:flex lg:w-1/2 p-4 hidden'>
                <img
                    src='https://doccure.dreamstechnologies.com/html/template/assets/img/login-banner.png'
                    alt=''
                />
            </div>

            {isLoading && <LoadingCommon />}
        </div>
    );
}
