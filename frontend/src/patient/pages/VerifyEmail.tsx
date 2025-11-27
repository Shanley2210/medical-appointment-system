import { Card, CardContent } from '@/components/ui/card';
import ButtonCommon from '@patient/components/ButtonCommon';
import OTPInput from '../components/OTPInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { toast } from 'react-toastify';
import { resendOtp, verifyEmail } from '@/shared/apis/authService';

export default function VerifyEmail() {
    const location = useLocation();
    const emailLocation = location.state?.email;
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [cooldown, setCooldown] = useState(0);
    const [otp, setOtp] = useState('');
    const [verifyTime, setVerifyTime] = useState(180);
    const [isLoading, setIsLoading] = useState(false);
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
    const handleVerify = async () => {
        if (!otp || otp.length !== 6) {
            toast.error(language === 'vi' ? 'OTP không hợp lệ' : 'Invalid OTP');
        }

        const dataOtp = {
            email: emailLocation,
            otp: otp
        };

        try {
            setIsLoading(true);

            const res = await verifyEmail(dataOtp);

            if (res.data.errCode === 0) {
                if (res.data.tokens?.refreshToken) {
                    localStorage.setItem(
                        'refreshToken',
                        res.data.tokens.refreshToken
                    );
                }

                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );

                navigate('/', { replace: true });
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
            <div className='lg:flex lg:w-1/2 p-4 hidden'>
                <img
                    src='https://doccure.dreamstechnologies.com/html/template/assets/img/login-banner.png'
                    alt=''
                />
            </div>

            <div className='w-full max-w-md lg:w-1/2 lg:max-w-lg p-2 sm:p-4'>
                <Card className='shadow-none border-gray-400 rounded-none'>
                    <CardContent className='p-5'>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800 text-center'>
                                {t('verifyEmail.tt')}
                            </h2>

                            <h4 className='mt-7 text-center'>
                                {t('verifyEmail.st')}
                            </h4>

                            <h2 className='mt-2 text-center font-bold'>
                                {emailLocation}
                            </h2>
                        </div>

                        <form className='space-y-4'>
                            <OTPInput
                                length={6}
                                onChange={(otp) => setOtp(otp)}
                            />

                            <div className='text-gray-900 text-center font-medium mb-4 text-'>
                                {t('verifyEmail.ti')}
                                <span className='text-blue-600 font-medium '>
                                    {formatTime(verifyTime)}
                                </span>
                            </div>

                            <ButtonCommon
                                label={t('verifyEmail.vf')}
                                onClick={handleVerify}
                            />
                        </form>

                        <div className='text-center mt-6 text-sm'>
                            {t('verifyEmail.kn')}
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
                                    : t('verifyEmail.re')}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {isLoading && <LoadingCommon />}
        </div>
    );
}
