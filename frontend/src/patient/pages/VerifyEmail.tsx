import { Card, CardContent } from '@/components/ui/card';
import ButtonCommon from '@patient/components/ButtonCommon';
import OTPInput from '../components/OTPInput';

export default function VerifyEmail() {
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
                                Verify Email
                            </h2>

                            <h4 className='mt-7 text-center'>
                                Enter the 6-digit OTP sent to your email:
                            </h4>

                            <h2 className='mt-2 text-center font-bold'>
                                email@example.com
                            </h2>
                        </div>

                        <form className='space-y-4'>
                            <OTPInput
                                length={6}
                                onChange={(otp) => console.log('OTP: ' + otp)}
                            />

                            <div className='text-gray-900 text-center font-medium mb-4 text-'>
                                The code will expire in{' '}
                                <span className='text-blue-600 font-medium '>
                                    3:00
                                </span>
                            </div>

                            <ButtonCommon label='Verify' />
                        </form>

                        <div className='text-center mt-6 text-sm'>
                            You haven’t received the code.{' '}
                            <span className='text-blue-600 font-medium hover:underline cursor-pointer'>
                                Resend
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
