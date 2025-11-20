interface ToggleSwitchProps {
    checked?: boolean;
    onToggle?: (isChecked: boolean) => void;
}

export default function ToggleSwitch({
    checked = false,
    onToggle
}: ToggleSwitchProps) {
    const handleToggle = () => {
        if (onToggle) {
            onToggle(!checked);
        }
    };

    return (
        <label className='flex items-center cursor-pointer'>
            <div className='relative'>
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={handleToggle}
                    className='sr-only'
                />
                <div
                    className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out
                        ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}
                ></div>
                <div
                    className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out shadow-md
                        ${checked ? 'translate-x-6' : 'translate-x-0'}`}
                ></div>
            </div>
        </label>
    );
}
