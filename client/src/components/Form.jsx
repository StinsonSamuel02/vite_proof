import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';

import Axios from '../queries/axios';

const BasicForm = ({ requestMethod, articleID, onFormSubmit, btnText }) => {

    const handleFormSubmit = (values) => {

        switch (requestMethod) {
            case 'post':
                Axios.post('/articles/', {
                    title: values.title,
                    text: values.text
                })
                .then(res => {
                    console.log(res)
                    if (onFormSubmit) {
                        onFormSubmit(res); // Notifica al componente padre sobre el éxito de la operación
                    }
                })
                .catch(err => console.log(err));
                break;
            case 'put':
                Axios.put(`/articles/${articleID}/`, {
                        title: values.title,
                        text: values.text
                    })
                    .then(res => {
                        console.log(res)
                        if (onFormSubmit) {
                            onFormSubmit(res); // Notifica al componente padre sobre el éxito de la operación
                        }
                    })
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
        <Button type="primary" htmlType='submit'>{btnText}</Button>
      </Form.Item>

    </Form>
  );
};
export default BasicForm;
