import { Card, CardContent } from '@/components/ui/card';
import InputCommon from '@shared/components/InputCommon';
import ButtonCommon from '@shared/components/ButtonCommon';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../stores/hooks';
import { login } from '../stores/authSlice';

interface LoginForm {
    emailOrPhone: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            emailOrPhone: '',
            password: ''
        }
    });

    const onError = (errors: any) => {
        if (errors.emailOrPhone?.type === 'required') {
            toast.error('Email hoặc số điện thoại không được để trống');
            return;
        }
        if (errors.password?.type === 'required') {
            toast.error('Mật khẩu không được để trống');
            return;
        }
        if (errors.password?.type === 'minLength') {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
    };

    const onSubmit = async (data: LoginForm) => {
        const dataLogin = {
            emailOrPhone: data.emailOrPhone,
            password: data.password
        };

        try {
            const resultAction = await dispatch(login(dataLogin));

            if (login.fulfilled.match(resultAction)) {
                toast.success(resultAction.payload.message);
                switch (resultAction.payload.user.role) {
                    case 1:
                        navigate('/admin/dashboard');
                        break;
                    case 2:
                        navigate('/admin/dashboard');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            } else if (login.rejected.match(resultAction)) {
                const errMessage =
                    resultAction.payload || 'Đã xãy ra lỗi không xác định';

                toast.error(errMessage);
            }
        } catch (e) {
            console.error('Lỗi gọi API Login:', e);
            toast.error('Lỗi hệ thống hoặc mạng.');
        }
    };

    return (
        <div className='min-h-screen bg-white flex lg:flex-row items-center justify-center sm:p-4'>
            <div className='w-full max-w-md lg:w-1/2 lg:max-w-lg p-2 sm:p-4'>
                <Card className='shadow-none border-gray-400 rounded-none'>
                    <CardContent className='p-5'>
                        <div className='flex justify-center mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800'>
                                Login
                            </h2>
                        </div>

                        <form
                            className='space-y-4'
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <InputCommon
                                lable='Email or Phone'
                                type='text'
                                {...register('emailOrPhone', {
                                    required: true
                                })}
                            />

                            <InputCommon
                                lable='Password'
                                type='password'
                                isPassword={true}
                                {...register('password', {
                                    required: true,
                                    minLength: 6
                                })}
                            />

                            <ButtonCommon label='Sign in' type='submit' />
                        </form>

                        <div className='flex items-center my-6'>
                            <div className='grow border-t border-gray-400'></div>

                            <span className='mx-4 text-gray-500 text-sm font-light'>
                                or
                            </span>

                            <div className='grow border-t border-gray-400'></div>
                        </div>

                        <ButtonCommon
                            label='Sign in with Google'
                            isGoogle={true}
                        />

                        <div className='text-center mt-6 text-sm'>
                            Don't have an account ?{' '}
                            <span
                                className='text-blue-600 font-medium hover:underline cursor-pointer'
                                onClick={() => navigate('/register')}
                            >
                                Sign up
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
        </div>
    );
}
