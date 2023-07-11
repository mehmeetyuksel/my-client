import { Button, Col, Form, Row, message } from 'antd'
import { useEffect, useState } from 'react'
import { Input } from 'antd';
import moment from 'moment';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const { TextArea } = Input;

function Posts() {

    const [form] = Form.useForm();
    const [posts, setPosts] = useState<string[]>([])

    const axiosPrivate = useAxiosPrivate()

    const getPosts = async () => {
        try {
            let response = await axiosPrivate.get('/api/user/get-posts')
            setPosts(response.data.posts)
        } catch (err: any) {
            message.error(err.response.data.message)
        }
    }

    const onFinish = async (post: string) => {
        try {
            await axiosPrivate.post('/api/user/add-post', post)
            message.success("Post başarıyla kaydedildi")
            await getPosts()
            form.resetFields()
        } catch (err: any) {
            message.error(err.response.data.message)
        }

    }

    const removePost = async (id: string) => {
        try {
            await  axiosPrivate.post('/api/user/remove-post', {id: id})
            message.success('Post başarıyla silindi...')
            await getPosts()
        } catch (err: any) {
            message.error(err.response.data.message)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])


    return (
        <div className='px-2 py-1'>
            <div className='gap-3 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    posts.length ? posts.map((post: any, i: number) => (
                        <Col key={i}>
                            <div className='w-full bg-slate-300 rounded-md'>
                                <div className='flex justify-between'>
                                    <span>{post.post}</span>
                                    <Button size='small' className='mt-1 mr-1 hover:bg-red-700' onClick={() => removePost(post.id)} danger>Sil</Button>
                                </div>
                                
                                <span>{moment(post.createdAt).format('LLLL')}</span>
                            </div>
                        </Col>

                    )) : <> {`Post bulunamadı :)`}</>
                }
            </div>
            <Row>
                <Form
                    className='w-full lg:w-1/4 mx-auto mt-1'
                    name="basic"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item name='post'>
                        <TextArea rows={6} placeholder="En fazla 500 karakter" maxLength={500} />
                    </Form.Item>
                    <Form.Item>
                        <Row justify={'end'}>
                        <Button className='bg-slate-600 text-white hover:text-white outline-none' htmlType="submit">
                            Kaydet
                        </Button>
                        </Row>
                   
                    </Form.Item>
                </Form>
            </Row>
        </div>

    )
}

export default Posts