import React, { useState } from 'react'
import { Button, Card, Input, Form, Tabs, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addObject } from 'redux/actions/selectedObjectsActions';
import { useDispatch } from 'react-redux';
import { ROW_GUTTER } from 'constants/ThemeConstant';

const ControlSide = () => {
	const [ selected, setSelected ] = useState();
	const [isBlocked, setIsBlocked] = useState(false);
	const dispatch = useDispatch();
	
	let objectList = [		
		{ id: 1, chairsCount: 1, src: "table-1.png "},
		{ id: 2, chairsCount: 6, src: "table-6.png "},
		{ id: 3, chairsCount: 2, src: "table-2-2.png "},
		{ id: 4, chairsCount: 2, src: "table-2.png "},
		{ id: 5, chairsCount: 4, src: "table-4-2.png "},
		{ id: 6, chairsCount: 4, src: "table-4-rounded.png "},
		{ id: 7, chairsCount: 4, src: "table-4.png "},
		{ id: 8, chairsCount: 6, src: "table-6-2.png "},
		{ id: 9, chairsCount: 6, src: "table-6-3.png "},
		{ id: 10, chairsCount: 5, src: "table-6-4.png "},
		{ id: 11, chairsCount: 7, src: "table-7.png "},
		{ id: 12, chairsCount: 8, src: "table-8.png"},
	];

	const selectObj = (obj) => {
		setSelected(obj);
	}

	const handleAddObject = () => {
		console.log('add');
		if (selected) {
			dispatch(addObject(selected));
		}
	}

	const handleBlockChange = () => {
		if(isBlocked){
			setIsBlocked(false);
		}else{
			setIsBlocked(true);
		}
	};

	const handleInputChange = (key, value) => {
		if (selected) {
		  setSelected((prev) => ({
			...prev,
			[key]: value,
		  }));
		}
	};

	return (
		<>
		<Card>
			<Tabs defaultActiveKey="1">
				<Tabs.TabPane tab="все столи" key="1">
					<div style={{ maxWidth: '100%', overflowX: 'scroll', display: 'flex' }}>
						{
							objectList.map((obj) => {
								return (
									<img 
										style={{ 
											maxWidth: "100px", 
											margin: "10px", 
											borderRadius: "12px", 
											cursor: "pointer", 
											outline: selected?.id === obj.id? "solid red 5px": "solid transparent 0px" 
										}} 
										onClick={() => { selectObj(obj) }}
										src={'/img/objects/'+obj.src} 
										alt={obj.src}
										key={obj.id}
									/>
								);
							})
						}
					</div>
				</Tabs.TabPane>
				<Tabs.TabPane tab="2 стула" key="2">
					<div style={{ maxWidth: '100%', overflowX: 'scroll', display: 'flex' }}>
						{
							objectList.map((obj) => {
								if(obj.chairsCount !== 2){ return null; }
								return (
									<img 
										style={{ 
											maxWidth: "100px", 
											margin: "10px", 
											borderRadius: "12px", 
											cursor: "pointer", 
											outline: selected?.id === obj.id? "solid red 5px": "solid transparent 0px" 
										}} 
										onClick={() => { selectObj(obj) }}
										src={'/img/objects/'+obj.src} 
										alt={obj.src}
										key={obj.id}
									/>
								);
							})
						}
					</div>
				</Tabs.TabPane>
				<Tabs.TabPane tab="болшы стол" key="3">
					<div style={{ maxWidth: '100%', overflowX: 'scroll', display: 'flex' }}>
					{
							objectList.map((obj) => {
								if(obj.chairsCount <= 2){ return null; }
								return (
									<img 
										style={{ 
											maxWidth: "100px", 
											margin: "10px", 
											borderRadius: "12px", 
											cursor: "pointer", 
											outline: selected?.id === obj.id? "solid red 5px": "solid transparent 0px" 
										}} 
										onClick={() => { selectObj(obj) }}
										src={'/img/objects/'+obj.src} 
										alt={obj.src}
										key={obj.id}
									/>
								);
							})
						}
					</div>
				</Tabs.TabPane>
			</Tabs>
		</Card>
		<Card title="Параметры элемента" extra={
			<div style={{ display: 'flex', gap: '10px' }}>
			Заблокировать
			<div style={{
					display: "block",
					width: '20px',
					height: '20px',
					borderRadius: '50%',
					border: 'solid 1px #2d2121',
					backgroundColor: isBlocked? '#000' : '#fff',
					cursor: "pointer"
				}}
				onClick={handleBlockChange}
			></div>
			</div>
		}>
			<Form
				layout="vertical"
				style={{ marginTop: 20, color: "#fff" }}
			>
				<Row gutter={ROW_GUTTER}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item label="Поворот (макс. 360°):" style={{ color: "#fff" }}>
							<Input
								type="number"
								placeholder="X"
								disabled={!selected}
								max={360}
								min={0}
								value={selected?.position_x || ""}
								onChange={(e) => handleInputChange("position_x", e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item label="Поворот (макс. 360°):" style={{ color: "#fff" }}>
							<Input
								type="number"
								placeholder="Y"
								disabled={!selected}
								max={360}
								min={0}
								value={selected?.position_y || ""}
								onChange={(e) => handleInputChange("position_y", e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item label="Поворот (макс. 360°):" style={{ color: "#fff" }}>
							<Input
								type="number"
								placeholder="Введите поворот"
								disabled={!selected}
								max={360}
								min={0}
								value={selected?.rotate || ""}
								onChange={(e) => handleInputChange("rotate", e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item label="размер (мин. 50%, макс. 100%):" style={{ color: "#fff" }}>
							<Input
								type="number"
								placeholder="Ширина"
								disabled={!selected}
								max={100}
								min={50}
								value={selected?.width || ""}
								onChange={(e) => handleInputChange("width", e.target.value)}
							/>
						</Form.Item>
					</Col>
				</Row>

			</Form>
		</Card>

		{
                selected? 
                    <div style={{ display: 'block', textAlign: "right", marginTop: '10px' }}>
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined /> }
                            onClick={handleAddObject}
                        >
                            добавить
                        </Button>
                    </div>
                :null
            }
		</>
	)
}

export default ControlSide