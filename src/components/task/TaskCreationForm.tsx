import React from 'react';
import {Form, Modal} from 'antd';
interface TaskCreationFormProps {
    visible: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
}

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({visible, onCreate, onCancel}) => {
    const [form] = Form.useForm();

    const onSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                // Destructure complexity from the values
                const { sourceFolderId } = values;
                form.resetFields();
                onCreate(sourceFolderId); // Pass complexity directly instead of an object
            });
    };

    return (
        <Modal
            title="Create New Task"
            open={visible}
            onOk={onSubmit}
            onCancel={onCancel}
        >

            <Form form={form}>
                <Form.Item
                    label="Compexity"
                    name="sourceFolderId"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a complexity value between 1 and 1,000,000',
                        },
                        // Add a validator to check if the complexity value is in range
                        {
                            validator: (_, value) => {
                                if (value >= 1 && value <= 1000000) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Complexity value must be between 1 and 1,000,000'));
                            },
                        },
                    ]}
                >
                    <input type="range" min="1" max="1000000"/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskCreationForm;