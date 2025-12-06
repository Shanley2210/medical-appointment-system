import { Card, CardContent } from '@/components/ui/card';
import InputCommon from '@patient/components/InputCommon';
import ButtonCommon from '@patient/components/ButtonCommon';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { forgotPassword } from '@/shared/apis/patientService';
import { useContext, useState } from 'react';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

interface ForgotPasswordForm {
    emailOrPhone: string;
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [isLoading, setIsLoading] = useState(false);
    const { isDark } = useContext(ThemeContext);

    const { register, handleSubmit } = useForm<ForgotPasswordForm>();

    const onSubmit = async (data: ForgotPasswordForm) => {
        const inputVal = data.emailOrPhone.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]+$/;

        const isEmail = emailRegex.test(inputVal);
        const isPhone = phoneRegex.test(inputVal);

        if (!isEmail && !isPhone) {
            toast.error(
                language === 'vi'
                    ? 'Định dạng Email hoặc Số điện thoại không hợp lệ'
                    : 'Invalid Email or Phone number format'
            );
            return;
        }

        if (isPhone && (inputVal.length < 9 || inputVal.length > 11)) {
            toast.error(
                language === 'vi'
                    ? 'Số điện thoại phải từ 9 đến 11 số'
                    : 'Phone number must be between 9 and 11 digits'
            );
            return;
        }

        try {
            setIsLoading(true);

            const payload = { emailOrPhone: inputVal };
            const res = await forgotPassword(payload);

            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );

                navigate('/reset-password', {
                    replace: true,
                    state: { email: inputVal }
                });
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const onError = (errors: any) => {
        if (errors.emailOrPhone?.type === 'required') {
            toast.error(
                language === 'vi'
                    ? 'Email hoặc số điện thoại không được để trống'
                    : 'Email or Phone is required'
            );
        }
    };

    return (
        <div
            className={`min-h-screen flex lg:flex-row items-center justify-center sm:p-4 select-none ${
                isDark ? 'bg-gray-900' : 'bg-white'
            }`}
        >
            <div className='w-full max-w-md lg:w-1/2 lg:max-w-lg p-2 sm:p-4'>
                <Card
                    className={`shadow-none border-gray-400 rounded-none ${
                        isDark ? 'bg-gray-800 text-white' : 'bg-white'
                    }`}
                >
                    <CardContent className='p-5'>
                        <div className='mb-6'>
                            <h2
                                className={`text-2xl font-semibold text-center ${
                                    isDark ? 'text-white' : 'text-gray-800'
                                }`}
                            >
                                {t('forgotPassword.tt')}
                            </h2>

                            <h4 className='mt-7'>{t('forgotPassword.st')}</h4>
                        </div>

                        <form
                            className='space-y-4'
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <InputCommon
                                lable={t('forgotPassword.ep')}
                                type='text'
                                {...register('emailOrPhone', {
                                    required: true
                                })}
                            />

                            <ButtonCommon
                                label={t('forgotPassword.sm')}
                                type='submit'
                            />
                        </form>

                        <div className='text-center mt-6 text-sm'>
                            {t('forgotPassword.rp')}{' '}
                            <span
                                className='text-blue-600 font-medium hover:underline cursor-pointer'
                                onClick={() => navigate('/login')}
                            >
                                {t('forgotPassword.si')}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {isLoading && <LoadingCommon />}

            <div className='lg:flex lg:w-1/2 p-4 hidden'>
                <img
                    src='https://doccure.dreamstechnologies.com/html/template/assets/img/login-banner.png'
                    alt=''
                />
            </div>
        </div>
    );
}
