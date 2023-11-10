import { Table, Tag, notification, Layout, Spin, Button } from 'antd';
import { useEffect, useState } from 'react';

import { getAllTestResult } from '../../../apis/TestResultService';

const TestHistory = () => {
  const [testHistory, setTestHistory] = useState([]);

  const columns = [
    {
      title: 'Tên Đề',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số câu đúng',
      dataIndex: 'rightAns',
      key: 'rightAns',
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Loại bằng',
      dataIndex: 'testType',
      key: 'testType',
      sorter: (a, b) => a?.testType?.localeCompare(b.testType),
      render: (_, { testType }) => (
        <>
          {
            <Tag color={testType == 'B1' ? 'geekblue' : 'green'} key={testType}>
              {testType.toUpperCase()}
            </Tag>
          }
        </>
      ),
    },
    {
      title: 'Kết quả',
      dataIndex: 'isPass',
      key: 'isPass',
      render: (_, { isPass }) => (
        isPass ?
          <Button type="primary" danger>
            Đậu
          </Button>
          :
          <Button type="primary" danger>
            Rớt
          </Button>
      )
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const user = JSON.parse(localStorage.getItem('user'));
    getAllTestResult(user._id)
      .then((rs) => {
        const testResult = rs.data.data.TestResult;
        const finalResult = [];
        for (let i = 0; i < testResult.length; i++) {
          let sample = {};
          sample.key = testResult[i]._id;
          sample.name = testResult[i].sampleTestId.testName;
          sample.testType = testResult[i].sampleTestId.testType;
          sample.rightAns = testResult[i].numRightQuestion + '/35';
          sample.score = testResult[i].score + '/100';
          sample.isPass = testResult[i].isPass;
          finalResult.push(sample);
        }
        setTestHistory(finalResult);
      })
      .catch((err) => {
        console.log(err);
        notification.warning({ message: 'Error, please try again later..' });
      });
  }, []);

  return (
    <Layout
      style={{
        padding: 24,
        margin: 0,
        minHeight: '100%',
      }}
    >
      <div style={{ minHeight: '100vh' }}>
        <Spin spinning={!(testHistory.length > 0)}>
          <Table columns={columns} dataSource={testHistory} />
        </Spin>
      </div>
    </Layout>
  );
};

export default TestHistory;
