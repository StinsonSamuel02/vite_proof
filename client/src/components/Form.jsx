import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Radio } from 'antd';

const BasicForm = ({ requestMethod, articleID }) => {

    const handleFormSubmit = (values) => {

        switch (requestMethod) {
            case 'post':
                axios.post('http://127.0.0.1:8000/server/articles/', {
                    title: values.title,
                    text: values.text
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
                break;
            case 'put':
                axios.put(`http://127.0.0.1:8000/server/articles/${articleID}`, {
                        title: values.title,
                        text: values.text
                    })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                break;
        }

        form.resetFields();
    }

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };

    const formItemLayout = formLayout === 'horizontal'? {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    } : null;

    const buttonItemLayout = formLayout === 'horizontal'? {
        wrapperCol: {
            span: 14,
            offset: 4,
        },
    }: null;

  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: formLayout === 'inline'? 'none' : 600,
      }}
      onFinish={handleFormSubmit}
    >
      <Form.Item
        name='title'
        label="Article Title"
        rules={[{ required: true, message: 'Please input the article title!' }]}
      >
        <Input placeholder="Write the title of your article." />
      </Form.Item>

      <Form.Item
        name='text'
        label="Article Text"
        rules={[{ required: true, message: 'Please input the article text!' }]}
      >
        <Input placeholder="Write the text of your article." />
      </Form.Item>

      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType='submit'>Post</Button>
      </Form.Item>

    </Form>
  );
};
export default BasicForm;
