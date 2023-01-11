import { Col, Form, Layout, Row } from "antd"
import 'bootstrap/dist/css/bootstrap.css';
const  {Sider,Header,Content,Footer} = Layout;
import React from "react";
import { useDrag } from "react-dnd";




const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const type = 'DragableUploadList';

export default function Votes(props) {
    

    const onFinish = (val: any) => {
        console.log('data', val);
    }
    const [_, drag] = useDrag({
        type,
        //item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
    })})
    return <Layout className="" style={{height:"100vh"}}>
    <Header className="vote-page-header">Header</Header>
        <Row className="h-100 vote-page-content">
            <Col sm={24} md={12} lg={8} className="vote-page-side">
                <Form name="New vote informations" onFinish={onFinish} {...formItemLayoutWithOutLabel}>
                    <Form.List name="Items">{(fields, { add, remove }, { errors }) => (
                        fields.map(((field,index)=>(<Form.Item></Form.Item>)))
                    )}</Form.List>
                </Form>
            </Col>
            <Col sm={24} md={12} lg={14}>b</Col>
        </Row>
    <Footer>Footer</Footer>
  </Layout>
}
// #92cbdf