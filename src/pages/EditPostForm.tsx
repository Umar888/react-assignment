import React from 'react';
import { Form, Input, Button, Modal } from 'antd';

interface EditPostFormProps {
    post: any | null;
    visible: boolean;
    onCancel: () => void;
    onUpdate: (updatedPost: { title: string; body: string }) => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post, visible, onCancel, onUpdate }) => {
    const handleFinish = async (values: { title: string; body: string }) => {
        if (post) {
            onUpdate(values);
        }
    };

    if (!post) {
        return null;
    }

    return (
        <Modal
            title="Edit Post"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                name="basic"
                layout="vertical"
                initialValues={{ title: post.title, body: post.body }}
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Desription"
                    name="body"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                        Update
                    </Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditPostForm;
