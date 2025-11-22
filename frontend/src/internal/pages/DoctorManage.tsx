import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { Button, Select, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import AdminModal from '../components/AdminModal';
import Pagination from '../components/Pagination';
import {
    fetchDoctors,
    selectDoctor,
    type IDoctor
} from '@/shared/stores/doctorSlice';
import { GoPencil } from 'react-icons/go';
import { AiOutlineSchedule } from 'react-icons/ai';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { IoPricetagsOutline } from 'react-icons/io5';
import ToggleSwitch from '../components/ToggleSwitch';
import type { filterConfig } from '../components/AdminFilter';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function DoctorManage() {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const { list: doctors } = useAppSelector(selectDoctor);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const currentData = doctors.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    const columns = [
        {
            title: 'Anh',
            dataIndex: 'image',
            key: 'image',
            align: 'center' as const,
            render: (image: string) => (
                <img
                    src={
                        image.startsWith(BACKEND_URL)
                            ? image
                            : `${BACKEND_URL}${image}`
                    }
                    alt='Doctor Image'
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover'
                    }}
                    className='rounded-full'
                />
            )
        },
        {
            title: 'Email',
            dataIndex: 'user',
            key: 'email',
            render: (user: any) => user?.email
        },
        {
            title: 'Ten',
            dataIndex: 'user',
            key: 'name',
            render: (user: any) => user?.name
        },
        {
            title: 'Chuyen KHoa',
            dataIndex: 'specialty',
            key: 'specialty',
            render: (specialty: any) => specialty?.name
        },
        {
            title: 'Phong lam viec',
            dataIndex: 'room',
            key: 'room',
            align: 'center' as const
        },
        {
            title: 'Gia dat lich',
            dataIndex: 'price',
            key: 'price',
            align: 'center' as const,
            render: (_: any, record: IDoctor) => (
                <div className='flex gap-3 items-center justify-center'>
                    <div>{Number(record.price).toLocaleString('vi-VN')} </div>
                    <button
                        onClick={() => console.log(record.id)}
                        className='flex items-center gap-2 justify-center cursor-pointer'
                    >
                        <IoPricetagsOutline className='text-xl text-blue-500' />
                    </button>
                </div>
            )
        },
        {
            title: 'trang thai',
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (_: any, record: IDoctor) => (
                <ToggleSwitch
                    checked={record.status === 'active'}
                    // onToggle={() => {
                    //     handleToggleStatus(Number(record.key), record.status);
                    // }}
                />
            )
        },
        {
            title: 'Hanh dong',
            dataIndex: 'action',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: IDoctor) => (
                <div className='flex gap-5'>
                    <button>
                        <GoPencil className='text-2xl text-blue-500 cursor-pointer' />
                    </button>

                    <button>
                        <AiOutlineSchedule className='text-2xl text-blue-500 cursor-pointer' />
                    </button>

                    <button>
                        <RxOpenInNewWindow className='text-2xl text-blue-500 cursor-pointer' />
                    </button>
                </div>
            )
        }
    ];
    const modalConfigs: filterConfig[] = [
        {
            name: 'image',
            label: 'Hinh anh',
            type: 'upload',
            placeholder: 'upload'
        },
        {
            name: 'name',
            label: 'Ho ten',
            type: 'input'
        },
        {
            name: 'emal',
            label: 'Email',
            type: 'input'
        },
        {
            name: 'phone',
            label: 'So dien thoai',
            type: 'input'
        },
        {
            name: 'password',
            label: 'Mat khau',
            type: 'input'
        },
        {
            name: 'confirmPassword',
            label: 'Xac nhan Mat khau',
            type: 'input'
        },
        {
            name: 'specialty',
            label: 'Chuyen Khoa',
            type: 'select',
            options: []
        },
        {
            name: 'room',
            label: 'Phong lam viec',
            type: 'input'
        },
        {
            name: 'dob',
            label: 'Ngay sinh',
            type: 'date'
        },
        {
            name: 'ethnicity',
            label: 'Dan toc',
            type: 'input'
        },
        {
            name: 'gender',
            label: 'Gioi tinh',
            type: 'select',
            options: [
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nu' },
                { value: 'other', label: 'Khac' }
            ]
        },
        {
            name: 'address',
            label: 'Dia chi',
            type: 'input'
        },
        {
            name: 'degree',
            label: 'Hoc van',
            type: 'input'
        }
    ];

    useEffect(() => {
        if (doctors.length === 0) dispatch(fetchDoctors());
    }, [dispatch, doctors.length]);

    console.log(doctors);

    return (
        <div className='m-5'>
            <div
                className={`text-2xl uppercase pb-2 ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                Cac bac si
            </div>
            <div
                className={`flex justify-between ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                <div className='text-base py-2'>Bang / Bac si</div>
                <div>
                    <Button
                        className='rounded-none w-25'
                        onClick={() => setIsOpen(true)}
                    >
                        Them bac si
                    </Button>
                </div>
                <AdminModal
                    title='Them dich vu'
                    open={isOpen}
                    onCancel={() => {
                        setIsOpen(false);
                        // setEditItem(null);
                        // setFormData({});
                    }}
                    // onOk={editItem ? handleUpdate : handleSubmit}
                >
                    {/* {isLoading && <LoadingCommon />}
                    <AdminFilter
                        filters={modalConfigs}
                        initialValues={formData}
                        onChange={(values) => setFormData(values)}
                    /> */}
                </AdminModal>
            </div>

            <div className={`p-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className='flex gap-5 mb-5'>
                    <Select
                        defaultValue={pageSize.toString()}
                        style={{ width: 70 }}
                        options={[
                            { value: '10', label: '10' },
                            { value: '25', label: '25' },
                            { value: '50', label: '50' },
                            { value: '100', label: '100' }
                        ]}
                        onChange={handlePageSizeChange}
                    />
                    <div
                        className={`flex items-center text-base text-center ${
                            isDark ? 'text-gray-100' : 'text-neutral-900'
                        }`}
                    >
                        So muc moi trang
                    </div>
                </div>

                <div className={isDark ? 'text-black' : 'text-blue-500'}>
                    <Table
                        dataSource={currentData}
                        columns={columns}
                        rowKey='id'
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={doctors.length}
                                pageSize={pageSize}
                                current={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                isDark={isDark}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
