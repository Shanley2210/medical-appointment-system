import { Select, Table } from 'antd';

export default function Appointment() {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street'
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street'
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        }
    ];
    return (
        <>
            <div className='ml-5 size-10'>APPOINTMENTS</div>
            <div>Dashboard/Appointments</div>
            <div>
                <Select
                    defaultValue='lucy'
                    style={{ width: 120 }}
                    options={[
                        { value: 'jack', label: '5' },
                        { value: 'lucy', label: '25' },
                        { value: 'Yiminghe', label: '50' },
                        { value: 'disabled', label: '100', disabled: true }
                    ]}
                />
                <div>entries per page</div>
            </div>
            <Table dataSource={dataSource} columns={columns} />;
        </>
    );
}
