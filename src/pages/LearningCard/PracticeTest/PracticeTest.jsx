import { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';

import TestCard from './TestCard';
import { getSampleTest } from '../../../apis/SampleTestService';

import LearningCss from '../Learning.module.css';

const PracticeTest = () => {
  const [sampleTests, setSampleTests] = useState([]);

  useEffect(() => {
    getSampleTest().then((result) => {
      setSampleTests(result.data.data.SampleTest);
    });
  }, []);

  const renderSampleTest = (testType) => {
    return (
      <div>
        <div className={LearningCss.testTypeTitle}>Thi lái xe {testType}</div>
        <div>
          <Row justify={'start'}>
            {sampleTests
              ?.filter((item) => item.testType === testType)
              .map((test, index) => {
                return (
                  <Col key={index} span={5}>
                    <TestCard data={test} />
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{ minHeight: '80vh' }}
      className={LearningCss.practiceTestContainer}
    >
      {sampleTests.length <= 0 ? (
        <div style={{ width: '100%', textAlign: 'center', padding: '2rem 0' }}>
          <Spin />
        </div>
      ) : (
        <div>
          {renderSampleTest('B1')} {renderSampleTest('B2')}
        </div>
      )}
    </div>
  );
};

export default PracticeTest;
