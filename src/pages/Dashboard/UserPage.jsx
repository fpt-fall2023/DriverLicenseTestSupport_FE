import React from 'react';
import { Space, Table} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from './UserPage.module.css'
const columns = [
    {
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'Họ và Tên',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Tác vụ',
        key: 'action',
        render: (record) => (
            <Space size="middle">
                <EditOutlined style={{color:"blue"}}/>
                <DeleteOutlined style={{color:"red"}}/>
            </Space>
        ),
    },
];


const data = [
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '2',
        username: 'John Brown',
    },
    {
        userId: '3',
        username: 'John Brown',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
    {
        userId: '1',
        username: 'Sau lùm xùm về giấy thông báo doạ đuổi học sinh nếu phụ huynh không đến làm việc với nhà trường tại Trường THPT Lạc Long Quân (Sóc Sơn, Hà Nội), phụ huynh tiếp tục lên tiếng, không chấp nhận lời giải thích của nhà trường. Phụ huynh mong muốn trao đổi với thầy hiệu trưởng nhưng bị từ chối gặp.',
    },
];

const UserPage = () => {
    return (
        <div className={styles.main_container}>
            <div className={styles.container}>
            <Table pagination={{ pageSize: 7 }} columns={columns} dataSource={data} />
            </div>
        </div>
    );
}
export default UserPage;