import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/components/ui/input-otp';

interface OTPInputProps {
    length?: number;
    onChange?: (value: string) => void;
}

export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
    const handleChange = (value: string) => {
        onChange?.(value);
    };

    return (
        <div className='flex w-full justify-center'>
            <InputOTP maxLength={length} onChange={handleChange}>
                <InputOTPGroup className='flex gap-1'>
                    {[...Array(length)].map((_, i) => (
                        <InputOTPSlot
                            key={i}
                            index={i}
                            className='w-12 h-12 text-xl font-semibold border border-gray-300 rounded-none!'
                        />
                    ))}
                </InputOTPGroup>
            </InputOTP>
        </div>
    );
}
