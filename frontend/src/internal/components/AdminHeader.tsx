import { Avatar, Dropdown, Layout } from 'antd';
import { CgProfile } from 'react-icons/cg';
import { CiLight, CiDark } from 'react-icons/ci';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { BsTranslate } from 'react-icons/bs';
import { useContext } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const { Header } = Layout;

export default function AdminHeader() {
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const { i18n } = useTranslation();

    const items = [
        {
            key: '1',
            label: 'Profile'
        },
        {
            key: '2',
            label: 'Logout'
        }
    ];

    const laguages = [
        {
            key: 'en',
            label: (
                <div className='flex items-center gap-2'>
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/197/197374.png'
                        className='w-5 h-5'
                    />
                    <span>English</span>
                </div>
            ),
            onClick: () => changeLanguage('en')
        },
        {
            key: 'vi',
            label: (
                <div className='flex items-center gap-2'>
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/197/197473.png'
                        className='w-5 h-5'
                    />
                    <span>Tiếng Việt</span>
                </div>
            ),
            onClick: () => changeLanguage('vi')
        }
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Header className='flex justify-between items-center px-6 shadow-sm'>
            <div />
            <div className='flex items-center gap-10'>
                <button
                    className='text-lg cursor-pointer hover:text-blue-500 transition-colors'
                    onClick={toggleTheme}
                >
                    {isDark ? (
                        <CiLight className='text-3xl cursor-pointer' />
                    ) : (
                        <CiDark className='text-3xl cursor-pointer' />
                    )}
                </button>

                <Dropdown
                    menu={{ items: laguages }}
                    trigger={['click']}
                    placement='bottom'
                >
                    <BsTranslate className='text-2xl cursor-pointer' />
                </Dropdown>

                <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                    placement='bottom'
                >
                    <IoIosNotificationsOutline className='text-3xl cursor-pointer' />
                </Dropdown>

                <Dropdown menu={{ items }} placement='bottom'>
                    <Avatar size={'large'} icon={<CgProfile />} />
                </Dropdown>
            </div>
        </Header>
    );
}
