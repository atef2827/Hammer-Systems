import React from 'react'
import { Button, Card, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import { deleteAll, deleteObject, selectObject, updateObjectByCurrentSelected } from 'redux/actions/selectedObjectsActions';

const SaveDeleteObjects = () => {
	const selectedObject = useSelector((state) => state.selectedObjects.currentSelectedObject);
	const dispatch = useDispatch();

	const handleSaveObjects = () => {
		if (selectedObject) {
			dispatch(updateObjectByCurrentSelected());
		}
	}
	const handleDeleteObject = () => {
		if (selectedObject) {
			dispatch(deleteObject(selectedObject));
			dispatch(selectObject(null));
		}
	}

	const handleDeleteAll = () => {
		dispatch(deleteAll());
		dispatch(selectObject(null));
	}
	if(typeof selectedObject?.index === "undefined"){
		return null;
	}
	return (
		<Card>
				<Row gutter={ROW_GUTTER}>
					<Col xs={24} sm={24} md={8}>
						<Button 
                            type="primary" 
                            onClick={handleSaveObjects}
							block
                        >
                            сохранить
                        </Button>
					</Col>
					<Col xs={24} sm={24} md={8}>
						<Button 
                            type="primary"
							danger
                            onClick={handleDeleteAll}
							block
                        >
                            удалть все
                        </Button>
					</Col>
					<Col xs={24} sm={24} md={8}>
						<Button 
                            onClick={handleDeleteObject}
							block
                        >
                            удалть элемент
                        </Button>
					</Col>
				</Row>
			</Card>
	)
}

export default SaveDeleteObjects