import { Card, CardContent } from '@/components/ui/card';
import InputCommon from '@patient/components/InputCommon';
import ButtonCommon from '@patient/components/ButtonCommon';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-white flex lg:flex-row items-center justify-center sm:p-4'>
            <div className='w-full max-w-md lg:w-1/2 lg:max-w-lg p-2 sm:p-4'>
                <Card className='shadow-none border-gray-400 rounded-none'>
                    <CardContent className='p-5'>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800 text-center'>
                                Forgot Password
                            </h2>

                            <h4 className='mt-7'>
                                Enter your email and we will send you a link to
                                reset your password.
                            </h4>
                        </div>

                        <form className='space-y-4'>
                            <InputCommon lable='Email or Phone' type='text' />

                            <ButtonCommon label='Submit' />
                        </form>

                        <div className='text-center mt-6 text-sm'>
                            Remember password?{' '}
                            <span
                                className='text-blue-600 font-medium hover:underline cursor-pointer'
                                onClick={() => navigate('/login')}
                            >
                                Sign in
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
