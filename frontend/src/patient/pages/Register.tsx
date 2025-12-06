import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import InputCommon from '@patient/components/InputCommon';
import ButtonCommon from '@patient/components/ButtonCommon';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { registerPatient } from '@/shared/apis/patientService';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

interface RegisterForm {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const { register, handleSubmit } = useForm<RegisterForm>();
    const [isLoading, setIsLoading] = useState(false);
    const { isDark } = useContext(ThemeContext);

    const onSubmit = async (data: RegisterForm) => {
        const dataRegister = {
            name: data.fullName,
            email: data.email,
            phone: data.phoneNumber,
            password: data.password,
            confirmPassword: data.confirmPassword
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            toast.error(
                language === 'vi'
                    ? 'Email không đúng định dạng'
                    : 'Invalid email format'
            );
            return;
        }

        if (data.phoneNumber.length < 8 || data.phoneNumber.length > 11) {
            toast.error(
                language === 'vi'
                    ? 'Số điện thoại không hợp lệ'
                    : 'Invalid phone number'
            );
            return;
        }
        if (data.password !== data.confirmPassword) {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu không khớp'
                    : 'Password does not match'
            );
            return;
        }
        if (data.password.length < 6 || data.confirmPassword.length < 6) {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu phải có ít nhất 6 ký tự'
                    : 'Password must have at least 6 characters'
            );
            return;
        }

        try {
            setIsLoading(true);
            const res = await registerPatient(dataRegister);

            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );

                navigate('/verify-email', {
                    replace: true,
                    state: { email: data.email }
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
    };
    const onError = (errors: any) => {
        if (
            errors.fullName?.type === 'required' ||
            errors.email?.type === 'required' ||
            errors.phoneNumber?.type === 'required' ||
            errors.password?.type === 'required' ||
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
    return (
        <div
            className={`min-h-screen flex lg:flex-row items-center justify-center sm:p-4
        ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
        >
            <div className='lg:flex lg:w-1/2 p-4 hidden'>
                <img
                    src='https://doccure.dreamstechnologies.com/html/template/assets/img/login-banner.png'
                    alt=''
                    className={`${isDark ? 'opacity-80' : ''}`}
                />
            </div>

            <div className='w-full max-w-md lg:w-1/2 lg:max-w-lg p-2 sm:p-4'>
                <Card
                    className={`
                shadow-none rounded-none
                ${
                    isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-400'
                }
            `}
                >
                    <CardContent className='p-5'>
                        <div className='flex justify-center mb-6'>
                            <h2
                                className={`
                            text-2xl font-semibold
                            ${isDark ? 'text-white' : 'text-gray-800'}
                        `}
                            >
                                {t('register.tt')}
                            </h2>
                        </div>

                        <form
                            className='space-y-4'
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <InputCommon
                                lable={t('register.fn')}
                                type='text'
                                {...register('fullName', { required: true })}
                            />

                            <InputCommon
                                lable={t('register.em')}
                                type='text'
                                {...register('email', { required: true })}
                            />

                            <InputCommon
                                lable={t('register.ph')}
                                type='phone'
                                isPhone={true}
                                {...register('phoneNumber', { required: true })}
                            />

                            <InputCommon
                                lable={t('register.pa')}
                                type='password'
                                isPassword={true}
                                {...register('password', { required: true })}
                            />

                            <InputCommon
                                lable={t('register.cp')}
                                type='password'
                                isPassword={true}
                                {...register('confirmPassword', {
                                    required: true
                                })}
                            />

                            <ButtonCommon
                                label={t('register.su')}
                                type='submit'
                            />
                        </form>

                        <div className='flex items-center my-6'>
                            <div
                                className={`grow border-t ${
                                    isDark
                                        ? 'border-gray-600'
                                        : 'border-gray-400'
                                }`}
                            ></div>

                            <span
                                className={`mx-4 text-sm font-light ${
                                    isDark ? 'text-gray-300' : 'text-gray-500'
                                }`}
                            >
                                {t('register.or')}
                            </span>

                            <div
                                className={`grow border-t ${
                                    isDark
                                        ? 'border-gray-600'
                                        : 'border-gray-400'
                                }`}
                            ></div>
                        </div>

                        <ButtonCommon
                            label={t('register.gg')}
                            isGoogle={true}
                        />

                        <div
                            className={`text-center mt-6 text-sm ${
                                isDark ? 'text-gray-300' : 'text-black'
                            }`}
                        >
                            {t('register.al')}
                            <span
                                className='text-blue-600 font-medium hover:underline cursor-pointer'
                                onClick={() => navigate('/login')}
                            >
                                {t('register.si')}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {isLoading && <LoadingCommon />}
        </div>
    );
}
