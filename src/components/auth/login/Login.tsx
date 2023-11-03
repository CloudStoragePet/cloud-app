import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import { message } from 'antd';
import './Login.css';
import { useAuth } from '../../../utils/IAuthContext'; // Adjust the path to your AuthContext
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { authenticate } = useAuth();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const onFinish = async (values: any) => {
        const { email, password } = values;
        try {
            await authenticate(email, password);
            console.log('Success:', values);
            // Navigate to the logged-in area of your application here
            navigate('/');
        } catch (error) {
            console.error('Failed:', error);
            setErrorMsg('Authentication failed. Please check your email and password.');

            // Display the error message
            message.error(errorMsg);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <Form
            name={"login"}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label={"Email"}
                name={"email"}
                rules={[{required: true, message: "Please input your email"}]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label={"Password"}
                name={"password"}
                rules={[{required: true, message: "Please input your password"}]}>
                <Input.Password/>
            </Form.Item>
            <Button
                type={"primary"}
                htmlType={"submit"}
            >
                Login
            </Button>
        </Form>

    );

}

export default Login;