import React from 'react';
import styles from './AddQuestionPage.module.css'
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addQuestion } from '../../apis/QuestionService';

const AddQuestionPage = () => {

    const onFinish = (values) => {
        addQuestion(values.questionName, values.answers).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className={styles.App}>
            <div className={styles.container}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 1200 }}
            >
                <Form.Item label="Nội dung câu hỏi">
                    <TextArea />
                </Form.Item>
                <Form.Item label="Đáp án 1">
                    <TextArea />
                </Form.Item>
                <Form.Item label="Đáp án 1">
                    <TextArea />
                </Form.Item>
                <Form.Item label="Đáp án 1">
                    <TextArea />
                </Form.Item>
                <Form.Item label="Đáp án 1">
                    <TextArea />
                </Form.Item>
            </Form>
        </div>
        </div>

    );
}
export default AddQuestionPage;