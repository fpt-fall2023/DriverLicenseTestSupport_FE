import React, { useEffect, useState } from 'react';
import { TRAFFIC_API_URL } from '../../apis/APIConfig';
import axios from 'axios';
import { Col, Row } from 'antd';
import { Button, Space, Table } from 'antd';

const columns = [
  {
    title: 'Biển báo',
    dataIndex: 'trafficName',
    render: (text, record) => (
      <div>
        <h3>{record.title}</h3>
        <img src={record.image} alt={record.title} />
        <p>{record.description}</p>
      </div>
    ),
  },
];

const TrafficSignsPage = () => {
  const [dataSrc, setDataSrc] = useState([]);

  useEffect(() => {
    axios
      .get(TRAFFIC_API_URL)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data.TrafficSign);
          setDataSrc(res.data.data.TrafficSign);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Row>
        <Col></Col>
        <Col flex="auto">
          <div>
            <Space style={{ padding: 16 }}>
              <Button type="primary"></Button>
            </Space>
            <Table
              style={{ padding: 16 }}
              pagination={{ pageSize: 8 }}
              columns={columns}
              dataSource={dataSrc}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TrafficSignsPage;
