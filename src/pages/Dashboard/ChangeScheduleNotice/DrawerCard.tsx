import { Badge, Card, Tag } from 'antd';
import React from 'react';

const DrawerCard = ({ item }) => {
  return (
    <Badge.Ribbon text={item.response}>
      <Card
        size="small"
        title={`${item.student.name}`}
        style={{
          width: 300,
          marginTop: '10px',
        }}
      >
        <p>
          <strong style={{ color: '#717171' }}>Email:</strong>{' '}
          {item.student.email}
        </p>
        <p>
          <strong style={{ color: '#717171' }}>Số điện thoại:</strong>{' '}
          {item.student.phone}
        </p>
        <p>
          <strong style={{ color: '#717171' }}>Khung giờ thay đổi:</strong>{' '}
          <Tag color="success">{item.proposedSlot}</Tag>{' '}
        </p>
        {/* <p>{`Trạng thái: ${item.response}`}</p> */}
      </Card>
    </Badge.Ribbon>
  );
};

export default DrawerCard;
