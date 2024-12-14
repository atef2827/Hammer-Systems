import React, {useCallback, useEffect, useState} from 'react'
import { Card, Table, Input, Tooltip, Button } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import axios from 'axios';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Loading from 'components/shared-components/Loading';


const Clients = () => {
	let history = useHistory();
	// const [list, setList] = useState(ProductListData)
	const [fullData, setFullData] = useState([]);
	const [list, setList] = useState();

	const wait = (time) => {
		return new Promise((res) => setTimeout(res, time));
	};

	// Mohamed's code
	const getClients = useCallback(async () => {
		try{
			await wait(3000);
			const res = await axios.get('https://jsonplaceholder.typicode.com/users');
			if(!res.data || !Array.isArray(res.data)){
				setList([]);
			}else{
				setList(res.data);
				setFullData(res.data);
			}
		}catch(err){
			setList([]);
			console.log(err);
		}
	}, []);

	useEffect(() => {
		getClients();
	}, [getClients]);


	const viewDetails = row => {
		history.push(`/app/mohamed/clients/${row.id}`)
	}

	const tableColumns = [
		{
			title: 'имя',
			dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
					</div>
				),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'почта',
			dataIndex: 'email',
			render: (_, record) => (
				<><a href={`mailto:`+record.email} target="_blank" rel="noreferrer">{record.email}</a></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'email')
		},
		{
			title: 'номер телефона',
			dataIndex: 'phone',
		},
		{
			title: 'Адрес',
			dataIndex: 'address',
			render: address => (
				<> {address.street}, {address.city}</>
			),
		},
		{
			title: 'компания',
			dataIndex: 'company',
			render: company => (
				<> {company.name}</>
			),
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<Tooltip title="ещё">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {viewDetails(elm)}} size="small"/>
					</Tooltip>
				</div>
			)
		}
	];


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : fullData;
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	if(!list){
		return <Loading />;
	}

	return (
		<>
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="поиск" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
				</Flex>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
				/>
			</div>
		</Card>
		</>
	)
}

export default Clients