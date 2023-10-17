import React from 'react';
import styles from './AddQuestionPage.module.css'
import { Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addQuestion } from '../../apis/QuestionService';

const AddQuestionPage = () => {

    const answers = [
        {
            answer: 'Đáp án 1',
            isCorrect: true
        },
        {
            answer: 'Đáp án 2',
            isCorrect: false
        },
        {
            answer: 'Đáp án 3',
            isCorrect: false
        },
        {
            answer: 'Đáp án 4',
            isCorrect: false
        }
    ]

    const onFinish = (values) => {
        answers[0].answer = values.answer1
        answers[1].answer = values.answer2
        answers[2].answer = values.answer3
        answers[3].answer = values.answer4
        const categoryData = "Chưa có trên UI, Minh code thêm nha"
        // addQuestion(values.questionName, answers, categoryData).then((res) => {
        //     if (res.status === 200) {
        //         console.log(res.data)
        //     }
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    return (
        <div className={styles.App}>
            <div className={styles.container}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 1200, marginTop: 100 }}
                onFinish={onFinish}
            >
                <Form.Item name="question" label="Nội dung câu hỏi">
                    <TextArea />
                </Form.Item>
                <Form.Item name="answer1" label="Đáp án 1">
                    <TextArea />
                </Form.Item>
                <Form.Item name="answer2" label="Đáp án 2">
                    <TextArea />
                </Form.Item>
                <Form.Item name="answer3" label="Đáp án 3">
                    <TextArea />
                </Form.Item>
                <Form.Item name="answer4" label="Đáp án 4">
                    <TextArea />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
        </div>

    );
}
export default AddQuestionPage;