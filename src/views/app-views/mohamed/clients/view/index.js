import React, { Component } from 'react'
import { UserOutlined, LockOutlined, CreditCardOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Billing from './Billing';
import Orders from './Orders';

const SettingOption = ({ match, location }) => {
	return (
		<Menu
			defaultSelectedKeys={`${match.url}/edit-profile`}
			mode="inline"
			selectedKeys={[location.pathname]}
		>
			<Menu.Item key={`${match.url}/edit-profile`}>
				<UserOutlined />
				<span>редактировать</span>
				<Link to={'edit-profile'} />
			</Menu.Item>
			<Menu.Item key={`${match.url}/orders`}>
				<ShoppingCartOutlined />
				<span>заказы</span>
				<Link to={'orders'} />
			</Menu.Item>
			<Menu.Item key={`${match.url}/change-password`}>
				<LockOutlined />
				<span>изменить пароль</span>
				<Link to={'change-password'} />
			</Menu.Item>
			<Menu.Item key={`${match.url}/billing`}>
				<CreditCardOutlined />
				<span>Биллинг</span>
				<Link to={`billing`} />
			</Menu.Item>
		</Menu>
	);
};

const SettingContent = ({ match }) => {

	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/edit-profile`} />
			<Route path={`${match.url}/edit-profile`} 
				render={(props) => <EditProfile {...props} userId={match.params.clientId} />}
			/>
			<Route path={`${match.url}/orders`} component={Orders} />
			<Route path={`${match.url}/billing`} component={Billing} />
			<Route path={`${match.url}/change-password`} component={ChangePassword} />
		</Switch>
	)
}

export class View extends Component {
	render() {
		return (
			<InnerAppLayout 
				sideContentWidth={320}
				sideContent={<SettingOption {...this.props}/>}
				mainContent={<SettingContent {...this.props}/>}
			/>
    );
	}
}

export default View
