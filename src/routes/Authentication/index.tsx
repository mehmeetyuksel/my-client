import { Button, Form, Input, Layout, message } from 'antd';
import { loginNetwork } from './network';
import { UserLogin } from './type';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/authenticator';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onFinish = async (values: UserLogin) => {
        try {
            let response =  await loginNetwork(values)
            dispatch(setUser({
             loading: false,
             user: response.data.user,
             accessToken: response.data.accessToken
            }))
            message.success("Giriş Başarılı")
            navigate('/')
        } catch(err: any) {
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
                <Form.Item
                    label="E-Mail"
                    name="email"
                    rules={[{ required: true, message: 'Email gerekli' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Parola"
                    name="password"
                    rules={[{ required: true, message: 'Şifre gerekli' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" className='w-full bg-red-500 text-red hover:outline-none'>
                        Giriş Yap
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default SignIn