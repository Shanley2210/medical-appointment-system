import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import InputCommon from '@patient/components/InputCommon';
import ButtonCommon from '@patient/components/ButtonCommon';

export default function Register() {
    const navigate = useNavigate();
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
                        <div className='flex justify-center mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800'>
                                Patient Register
                            </h2>
                        </div>

                        <form className='space-y-4'>
                            <InputCommon lable='Full Name' type='text' />

                            <InputCommon lable='Email' type='text' />

                            <InputCommon
                                lable='Phone Number'
                                type='phone'
                                isPhone={true}
                            />

                            <InputCommon
                                lable='Password'
                                type='password'
                                isPassword={true}
                            />

                            <InputCommon
                                lable='Confirm Password'
                                type='password'
                                isPassword={true}
                            />

                            <ButtonCommon label='Sign in' />
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
                            Already have account?{' '}
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
        </div>
    );
}
