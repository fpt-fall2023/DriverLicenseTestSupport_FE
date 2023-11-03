import { Collapse, Table, Tag, notification, Layout } from 'antd';
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
      title: 'Test Type',
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
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getAllTestResult()
      .then((rs) => {
        const testResult = rs.data.data.TestResult;
        const userID = JSON.parse(localStorage.getItem('user'));
        const testHistory = testResult?.filter(
          (item) => item.userId?._id == userID._id,
        );
        const finalResult = [];
        for (let i = 0; i < testHistory.length; i++) {
          let sample = {};
          sample.name = testHistory[i].sampleTestId.testName;
          sample.testType = testHistory[i].sampleTestId.testType;
          sample.rightAns = testHistory[i].numRightQuestion + '/35';
          sample.score = testHistory[i].score + '/100';

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
        <Table columns={columns} dataSource={testHistory} />
      </div>
    </Layout>
  );
};

export default TestHistory;
