import React, { Component } from 'react';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import axios from 'axios';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';

export class EditProfile extends Component {

	avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'

	state= {
		user: null
	}

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}
	wait(time){
		return new Promise((res) => setTimeout(res, time));
	}

	async getUserData(){
		try{
			await this.wait(5000);
			let id = this.props.userId;
			const res = await axios.get('https://jsonplaceholder.typicode.com/users/'+id);
			if(res.data){
				let data = res.data;
				let user = {
					name: data.name,
					email: data.email,
					username: data.username,
					dateOfBirth: null,
					phone: data.phone,
					website: data.website,
					address: data.address.street,
					city: data.address.city,
					postcode: data.address.postcode,
				}
				this.setState({ user: user });
			}
		}catch(err){
			console.log(err);
		}
	}

	componentDidMount() {
		this.getUserData();
	  }

	render() {

		const { history } = this.props;

		const onFinish = values => {
			const key = 'updatable';
			message.loading({ content: 'Updating...', key });
			setTimeout(() => {
				let user = {
					name: values.name,
					email: values.email,
					username: values.username,
					dateOfBirth: values.dateOfBirth,
					phone: values.phone,
					website: values.website,
					address: values.address,
					city: values.city,
					postcode: values.postcode,
				};
				this.setState({ user: user })
				message.success({ content: 'Done!', key, duration: 2 });
				history.push('/app/mohamed/clients');
			}, 2000);
		};
	
		const onFinishFailed = errorInfo => {
			console.log('Failed:', errorInfo);
		};

		const onUploadAavater = info => {
			const key = 'updatable';
			if (info.file.status === 'uploading') {
				message.loading({ content: 'Uploading...', key, duration: 1000 });
				return;
			}
			if (info.file.status === 'done') {
				this.getBase64(info.file.originFileObj, imageUrl =>
					this.setState({
						avatarUrl: imageUrl,
					}),
				);
				message.success({ content: 'Uploaded!', key,  duration: 1.5 });
			}
		};

		const onRemoveAvater = () => {
			this.setState({
				avatarUrl: ''
			})
		}

		if(!this.state.user){
			return (
				<>
					<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
						<Skeleton.Avatar active={true} size={90} shape="circle" />
						<div className="ml-md-3 mt-md-0 mt-3">
							<Button type="primary" disabled>Change Avatar</Button>
						</div>
					</Flex>
					<div className="mt-4">
							<Row>
								<Col xs={24} sm={24} md={24} lg={16}>
									<Row gutter={ROW_GUTTER}>
										<Col xs={24} sm={24} md={12} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
										<Col xs={24} sm={24} md={12} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
										<Col xs={24} sm={24} md={12} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
										<Col xs={24} sm={24} md={12} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
										<Col xs={24} sm={24} md={12} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
										<Col xs={24} sm={24} md={12} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
										<Col xs={24} sm={24} md={24} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
										<Col xs={24} sm={24} md={12} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
										<Col xs={24} sm={24} md={12} className="full">
											<Skeleton.Input size="large" block={false} active={true} style={{ marginTop: '10px' }} />	
										</Col>
									</Row>
									<Skeleton.Button active={true} size="default" style={{ marginTop: '30px' }} />		
								</Col>
							</Row>
					</div>
				</>
			)
		}

		const { name, email, username, dateOfBirth, phone, website, address, city, postcode, avatarUrl } = this.state.user;

		return (
			<>
				<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
					<Avatar size={90} src={avatarUrl} icon={<UserOutlined />}/>
					<div className="ml-md-3 mt-md-0 mt-3">
						<Upload onChange={onUploadAavater} showUploadList={false} action={this.avatarEndpoint}>
							<Button type="primary">Change Avatar</Button>
						</Upload>
						<Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
					</div>
				</Flex>
				<div className="mt-4">
					<Form
						name="basicInformation"
						layout="vertical"
						initialValues={
							{ 
								'name': name,
								'email': email,
								'username': username,
								'dateOfBirth': dateOfBirth,
								'phone': phone,
								'website': website,
								'address': address,
								'city': city,
								'postcode': postcode
							}
						}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={16}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Name"
											name="name"
											rules={[
												{
													required: true,
													message: 'Please input your name!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="username"
											name="username"
											rules={[
												{
													required: true,
													message: 'Please input your username!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Email"
											name="email"
											rules={[{ 
												required: true,
												type: 'email',
												message: 'Please enter a valid email!' 
											}]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Date of Birth"
											name="dateOfBirth"
										>
											<DatePicker className="w-100"/>
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Phone Number"
											name="phone"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Website"
											name="website"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label="Address"
											name="address"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="City"
											name="city"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Post code"
											name="postcode"
										>
											<Input />
										</Form.Item>
									</Col>
								</Row>
								<Button type="primary" htmlType="submit">
									Save Change
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default withRouter(EditProfile)
