import { Button, Form, Input, Layout, message } from 'antd';
import { signupNetwork } from './network';
import { UserSignUp } from './type';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate()
    const onFinish = async (values: UserSignUp) => {
        try {
            await signupNetwork(values)
            message.success("Kayıt Başarılı")
            navigate('/login')
        } catch (err: any) {
            message.error(err.response.data.message)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout style={{ minHeight: '100vh' }} className='flex justify-center items-center w-full bg-blue-100'>
            <Form
                layout='vertical'
                name="basic"
                className='w-1/6'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item className='my-0'
                    label='İsim'
                    name='name'
                    rules={[{ required: true, message: 'İsim Gerekli' }]}
                >
                    <Input placeholder='İsim' />
                </Form.Item>
                <Form.Item className='my-0'
                    label='Soyisim'
                    name='surname'
                    rules={[{ required: true, message: 'Soyisim Gerekli' }]}
                >
                    <Input placeholder='Soyisim' />
                </Form.Item>
                <Form.Item className='my-0'
                    label="E-Mail"
                    name="email"
                    rules={[{ required: true, message: 'Email gerekli' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item className='mt-0'
                    label="Parola"
                    name="password"
                    rules={[{ required: true, message: 'Şifre gerekli' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" className='w-full bg-red-500 text-red hover:outline-none'>
                        Kayıt Ol
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default SignUp