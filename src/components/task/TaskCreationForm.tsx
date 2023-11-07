import React, {useState} from 'react';
import {Form, Modal} from 'antd';

interface TaskCreationFormProps {
    visible: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
}

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({visible, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const [complexityValue, setComplexityValue] = useState(1_000); // Create a state to store the complexity value
    const onSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                // Destructure complexity from the values
                const {sourceFolderId} = values;
                form.resetFields();
                onCreate(sourceFolderId); // Pass complexity directly instead of an object
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };
    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComplexityValue(parseInt(event.target.value)); // Update the complexity value when the range input changes
    };
    return (
        <Modal className="task-creation-modal"
               title="Create New Task"
               open={visible}
               onOk={onSubmit}
               onCancel={onCancel}
        >

            <Form className="task-creation-form" form={form}>
                <Form.Item
                    className="task-creation-form-item"
                    label={`Complexity: ${complexityValue}`}  // Display the complexity value
                    name="sourceFolderId"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a complexity value between 1 and 1,000,000',
                        },
                        // Add a validator to check if the complexity value is in range
                        {
                            validator: (_, value) => {
                                if (value >= 1 && value <= 10_000_000) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Complexity value must be between 1 and 1,000,000'));
                            },
                        },
                    ]}
                >
                    <input
                        type="range"
                        min="1"
                        max="1000000"
                        defaultValue="1000"
                        value={"1000"}
                        onChange={handleRangeChange} // Add the onChange event handler to update the complexity value
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskCreationForm;