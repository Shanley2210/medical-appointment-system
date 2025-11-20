import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { CarryOutOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AdminSideBar() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const currentKey = location.pathname.replace('/admin/', '');

    const items = [
        {
            key: 'dashboard',
            icon: <HomeOutlined />,
            label: t('adminSideBar.db')
        },
        {
            key: 'appointments',
            icon: <CarryOutOutlined />,
            label: t('adminSideBar.ap')
        },
        {
            key: 'specialties',
            icon: <CarryOutOutlined />,
            label: t('adminSideBar.sp')
        }
    ];

    const handleNavigate = (e: any) => {
        navigate(`/admin/${e.key}`);
    };

    return (
        <Sider trigger={null} collapsible className='h-screen'>
            <div className='text-2xl text-center font-bold text-blue-700 py-4'>
                ADMIN PANEL
            </div>

            <Menu
                mode='inline'
                selectedKeys={[currentKey]}
                items={items}
                onClick={handleNavigate}
            />
        </Sider>
    );
}
