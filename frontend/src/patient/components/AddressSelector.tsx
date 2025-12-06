import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface Province {
    code: number;
    name: string;
    wards?: Ward[];
}

interface Ward {
    code: number;
    name: string;
    province_code: number;
}

export interface AddressValue {
    provinceCode: string;
    provinceName: string;
    wardCode: string;
    wardName: string;
    detail: string;
}

interface AddressSelectorProps {
    label: string;
    value: AddressValue;
    onChange: (newValue: AddressValue) => void;
    isDark: boolean;
    inputClass: string;
}

export const AddressSelector = ({
    label,
    value,
    onChange,
    isDark,
    inputClass
}: AddressSelectorProps) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await fetch(
                    'https://provinces.open-api.vn/api/v2/p/'
                );
                const data = await res.json();
                setProvinces(data);
            } catch (error) {
                console.error('Failed to fetch provinces', error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchWards = async () => {
            if (!value.provinceCode) {
                setWards([]);
                return;
            }
            try {
                const res = await fetch(
                    `https://provinces.open-api.vn/api/v2/p/${value.provinceCode}?depth=2`
                );
                const data: Province = await res.json();
                setWards(data.wards || []);
            } catch (error) {
                console.error('Failed to fetch wards', error);
            }
        };
        fetchWards();
    }, [value.provinceCode]);

    const handleProvinceChange = (newProvinceCode: string) => {
        const selectedProvince = provinces.find(
            (p) => p.code.toString() === newProvinceCode
        );
        onChange({
            ...value,
            provinceCode: newProvinceCode,
            provinceName: selectedProvince?.name || '',
            wardCode: '',
            wardName: ''
        });
    };

    const handleWardChange = (newWardCode: string) => {
        const selectedWard = wards.find(
            (w) => w.code.toString() === newWardCode
        );
        onChange({
            ...value,
            wardCode: newWardCode,
            wardName: selectedWard?.name || ''
        });
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...value, detail: e.target.value });
    };

    return (
        <div className='flex flex-col gap-3 md:col-span-2 border p-4 rounded border-gray-200 dark:border-gray-700'>
            <Label className='font-semibold'>{label}</Label>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                    <Label className='text-xs text-gray-500'>
                        {t('patientProfile.vc')}
                    </Label>
                    <Select
                        value={value.provinceCode}
                        onValueChange={handleProvinceChange}
                    >
                        <SelectTrigger
                            className={`${inputClass} ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            <SelectValue
                                placeholder={t('patientProfile.cvc')}
                            />
                        </SelectTrigger>
                        <SelectContent className='bg-white border-none rounded-none max-h-[300px] overflow-y-auto'>
                            {provinces.map((p) => (
                                <SelectItem
                                    key={p.code}
                                    value={p.code.toString()}
                                >
                                    {p.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='text-xs text-gray-500'>
                        {t('patientProfile.vp')}
                    </Label>
                    <Select
                        value={value.wardCode}
                        onValueChange={handleWardChange}
                        disabled={!value.provinceCode}
                    >
                        <SelectTrigger
                            className={`${inputClass} ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            <SelectValue
                                placeholder={t('patientProfile.cvp')}
                            />
                        </SelectTrigger>
                        <SelectContent className='bg-white border-none rounded-none max-h-[300px] overflow-y-auto'>
                            {wards.map((w) => (
                                <SelectItem
                                    key={w.code}
                                    value={w.code.toString()}
                                >
                                    {w.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-2 md:col-span-2'>
                    <Label className='text-xs text-gray-500'>
                        {t('patientProfile.ct')}
                    </Label>
                    <Input
                        placeholder={t('patientProfile.nct')}
                        value={value.detail}
                        onChange={handleDetailChange}
                        className={inputClass}
                    />
                </div>
            </div>
        </div>
    );
};
