import { Button } from '@/components/ui/button';
import Loading from '@/shared/pages/Loading';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchPatientProfile,
    selectPatient
} from '@/shared/stores/patientSlice';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineCreditCard, AiOutlineHome } from 'react-icons/ai';
import { CiCalendar, CiUser } from 'react-icons/ci';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { IoIosArrowForward, IoIosTransgender } from 'react-icons/io';
import { VscNote } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

export default function Profile() {
    const dispatch = useAppDispatch();
    const { profile, loading } = useAppSelector(selectPatient);
    const navigate = useNavigate();
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    const formatGender = (gender: number | undefined) => {
        if (gender === undefined || gender === null) return 'No data';
        const isVi = language === 'vi';
        if (gender === 1) return isVi ? 'Nam' : 'Male';
        if (gender === 0) return isVi ? 'Nữ' : 'Female';
        return isVi ? 'Khác' : 'Other';
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'No data';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();

        return language === 'vi' ? `${d}/${m}/${y}` : `${y}/${m}/${d}`;
    };

    useEffect(() => {
        dispatch(fetchPatientProfile());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div
                    className={`
                flex flex-col px-4 lg:px-20 w-screen py-5 my-5
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
                >
                    <div className='flex items-center gap-1'>
                        <AiOutlineHome
                            className='text-xl cursor-pointer text-blue-500'
                            onClick={() => navigate('/')}
                        />

                        <IoIosArrowForward />
                        <span className='line-clamp-1'>
                            {t('patientProfile.tt')}
                        </span>
                    </div>

                    {profile ? (
                        <div className='flex flex-col gap-5 pt-5'>
                            <div className='border border-gray-200 p-5 gap-1 flex flex-col'>
                                <span className='text-center text-2xl font-bold'>
                                    {profile?.user?.name || 'No data'}
                                </span>

                                <div className='flex gap-1 justify-center text-sm'>
                                    <span className='text-gray-500'>
                                        Email:
                                    </span>
                                    <span>
                                        {profile?.user?.email || 'No data'}
                                    </span>
                                </div>
                                <div className='flex gap-1 justify-center text-sm'>
                                    <span className='text-gray-500'>
                                        {t('patientProfile.ph')}
                                    </span>
                                    <span>
                                        {profile?.user?.phone || 'No data'}
                                    </span>
                                </div>

                                <div className='text-center uppercase text-green-500 pt-2'>
                                    {t('patientProfile.xt')}
                                </div>

                                <div className='flex items-center justify-center pt-2'>
                                    <Button
                                        onClick={() =>
                                            navigate('/profile/create-profile')
                                        }
                                        className='border cursor-pointer rounded-none text-blue-500 border-blue-500 hover:bg-blue-200 transition-all duration-300'
                                    >
                                        {t('patientProfile.cn')}
                                    </Button>
                                </div>
                            </div>

                            <div className='border border-gray-200 p-5'>
                                <h1 className='text-xl uppercase font-bold pb-5'>
                                    {t('patientProfile.ttcb')}
                                </h1>

                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <CiCalendar />
                                            <span>
                                                {t('patientProfile.bd')}
                                            </span>
                                        </div>
                                        <div className='font-bold'>
                                            {formatDate(profile?.dob)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <IoIosTransgender />
                                            {t('patientProfile.gd')}
                                        </div>
                                        <div className='font-bold'>
                                            {formatGender(
                                                Number(profile?.gender)
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <CiUser />
                                            {t('patientProfile.dt')}
                                        </div>
                                        <div className='font-bold'>
                                            {' '}
                                            {profile?.ethnicity || 'No data'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <HiOutlineMapPin />
                                            {t('patientProfile.ad')}
                                        </div>
                                        <div className='font-bold'>
                                            {profile?.address || 'No data'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <HiOutlineMapPin />
                                            {t('patientProfile.fa')}
                                        </div>
                                        <div className='font-bold'>
                                            {' '}
                                            {profile?.familyAddress ||
                                                'No data'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='border border-gray-200 p-5 flex flex-col gap-5'>
                                <h1 className='text-xl font-bold'>
                                    {t('patientProfile.ttyt')}
                                </h1>

                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <AiOutlineCreditCard />
                                            {t('patientProfile.in')}
                                        </div>
                                        <div className='font-bold'>
                                            {profile?.insuranceNumber ||
                                                'No data'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <CiCalendar />
                                            {t('patientProfile.it')}
                                        </div>
                                        <div className='font-bold'>
                                            {profile?.insuranceTerm ||
                                                'No data'}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex gap-1 items-center'>
                                        <VscNote />
                                        {t('patientProfile.np')}
                                    </div>
                                    <div className='font-bold'>
                                        {profile?.notePMH || 'No data'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='border border-gray-200 p-5 gap-1 flex flex-col'>
                            <div className='text-center uppercase text-red-500 pt-2'>
                                {t('patientProfile.cths')}
                            </div>

                            <div className='flex items-center justify-center pt-2'>
                                <Button
                                    onClick={() =>
                                        navigate('/profile/create-profile')
                                    }
                                    className='border cursor-pointer rounded-none text-blue-500 border-blue-500 hover:bg-blue-200 transition-all duration-300'
                                >
                                    {t('patientProfile.ths')}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
