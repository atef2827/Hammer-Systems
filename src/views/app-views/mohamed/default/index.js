import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const Default = () => {
    return (
		<div>
            <div>
                <Paragraph style={{ fontSize: '30px', marginTop: '30px', textAlign: "center" }}>
                    <a href="https://mo-atef.com/ru" target="_blank" rel="noreferrer" style={{ color: "#000" }}>Мохамед Атеф Хасеб <LinkOutlined /></a>
                </Paragraph>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Row gutter={[16, 16]} justify="center" style={{ width: '80%' }}>
                    <Col xs={24} sm={12}>
                        <Card
                            extra={<Link to="/app/mohamed/clients">Перейти</Link>}
                            style={{ textAlign: 'center', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                        >
                            <Paragraph style={{ fontSize: '30px', marginTop: '10px' }}>
                                наши клиенты
                            </Paragraph>
                            <Paragraph style={{ maxWidth: '400px', margin: '10px auto' }}>
                                Примечание: Для доступа к <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noopener noreferrer">https://jsonplaceholder.typicode.com/users</a> требуется VPN.
                            </Paragraph>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Card
                            extra={<Link to="/app/mohamed/part2">Перейти</Link>}
                            style={{ textAlign: 'center', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                        >
                            <Paragraph style={{ fontSize: '30px', marginTop: '10px' }}>
                                Часть 2 (Доска объектов)
                            </Paragraph>
                            <Paragraph style={{ maxWidth: '400px', margin: '10px auto' }}>
                                Перейдите к доске объектов для взаимодействия с элементами.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Default;
