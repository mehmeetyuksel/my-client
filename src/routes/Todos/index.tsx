import { Button, DatePicker, Form, Input, Modal, Upload, UploadProps, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { InboxOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { imageToBase64 } from '../../utils/functions';
const { Dragger } = Upload;


function Todos() {

    const [form] = useForm()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [fileList, setFileList] = useState<any[]>([])
    const axiosPrivate = useAxiosPrivate()

    const onFinish = async (values: any) => {

        let base64Images = await Promise.all(fileList.map(async(file) =>  {
            let base64 = await imageToBase64(file.originFileObj)
            return ({
                name: file.name,
                type: file.type,
                base64 
            })  
        }))  

        try {
            await axiosPrivate.post('/api/user/add-todo', {...values, photos: base64Images})
            message.success('Event başarıyla eklendi')
        } catch (err: any) {
            message.error(err.response.data.message)
        } finally {
            closeModal()
        }
    }

    const dummyRequest = async ({ file, onSuccess }: any) => {
        onSuccess('ok') 
    }
       
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            const listFiles = info.fileList;
             setFileList(listFiles); 
            if (status === 'done') {
                message.success(`${info.file.name} adlı dosya kaydedildi.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} adlı dosya yüklenirken bir sorun oluştu.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const getTodos = async () => {
        try {
            let response = await axiosPrivate.get('http://localhost:8080/api/user/get-todos')
            console.log(response)
        } catch (err: any) {
            message.error(err.response.data.message)
        }
    }

    const closeModal = () => {
        setFileList([])
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
                    <Form.Item name='photos'>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Tıkla ve sürükleyerek dosya seç!</p>
                            <p className="ant-upload-hint">
                                Tekli ve çoklu görsel yüklemeye uygundur
                            </p>
                        </Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Todos