import { ToastContainer } from 'react-toastify';
import type { ToastContainerProps, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ExtendedTypeOptions = TypeOptions;

const toastClasses: Record<ExtendedTypeOptions | 'base', string> = {
    base: 'rounded-lg shadow-lg p-4 flex items-center',
    success: 'bg-white/75 text-green-500 border border-green-300 rounded-none',
    error: 'bg-white/75 text-red-500 border border-red-300 rounded-none',
    warning:
        'bg-white/75 text-yellow-500 border border-yellow-300 rounded-none',
    info: 'bg-white/75 text-blue-500 border border-ble-300 rounded-none',
    default: 'bg-white/75 text-black border border-gray-300 rounded-none'
};

export default function ToastProvider() {
    const customToastClassName: ToastContainerProps['toastClassName'] = (
        toast
    ) => {
        const typeKey = (toast?.type as ExtendedTypeOptions) || 'default';
        return `${toastClasses.base} ${
            toastClasses[typeKey] || toastClasses.default
        }`;
    };

    return (
        <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            className='mt-16'
            toastClassName={customToastClassName}
        />
    );
}
