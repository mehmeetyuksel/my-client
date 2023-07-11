import { Button, DatePicker, Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { addTodoNetwork, getTodosNetwork } from './network'

function Todos() {

    const [form] = useForm()
    const [showModal, setShowModal] = useState<boolean>(false)

    const onFinish = async (values: any) => {
        try {
            await addTodoNetwork(values)
            message.success('Event başarıyla eklendi')
        } catch(err: any) {
            message.error(err.response.data.message)
        } finally {
            form.resetFields()
            setShowModal(false)
        }
    }

    const getTodos = async () => {
        try {
            await getTodosNetwork().then((response) => console.log(response))
        } catch(err: any) {
            message.error(err.response.data.message)
        }
        
    }

    const closeModal = () => {
        form.resetFields()
        setShowModal(false)
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Event Ekle</Button>
            <Modal title="Event Ekle" open={showModal} onCancel={closeModal} onOk={() => form.submit()}>
                <Form
                    name="todo-form"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item name='date'>
                        <DatePicker
                            placeholder='Gün ve Saat Seçiniz'
                            format="DD-MM-YYYY HH:mm"
                            showTime
                        />
                    </Form.Item>
                    <Form.Item name='subject'>
                    <Input placeholder="Başlık" />
                    </Form.Item>
                    <Form.Item name='detail'>
                        <TextArea
                            maxLength={1000}
                            placeholder="İçerik"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Todos