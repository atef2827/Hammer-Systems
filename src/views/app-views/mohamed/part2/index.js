import React from 'react'
import { Col, Row } from 'antd';
import ControlSide from './ControlSide';
import ObjectsFrame from './ObjectsFrame';
import { ROW_GUTTER } from 'constants/ThemeConstant';

const Part2Objects = () => {

	return (
		<Row gutter={ROW_GUTTER} className='whiteImagesRow'>
			<Col xs={24} sm={24} md={12}>
				<ControlSide />
			</Col>
			<Col xs={24} sm={24} md={12}>
				<ObjectsFrame />
			</Col>
		</Row>
	)
}

export default Part2Objects