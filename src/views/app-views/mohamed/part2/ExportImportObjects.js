import React from "react";
import { Button, Card, Row, Col, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ROW_GUTTER } from "constants/ThemeConstant";
import { updateImportedObjects } from "redux/actions/selectedObjectsActions";

const ExportImportObjects = () => {
  const objects = useSelector((state) => state.selectedObjects.selectedObjects);
  const dispatch = useDispatch();

  // Export JSON File
  const handleExportJSON = () => {
    const jsonString = JSON.stringify(objects, null, 2); 
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "exported_objects.json"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import JSON File
  const handleImportFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          dispatch(updateImportedObjects(importedData)); 
          message.success("JSON imported successfully!");
        } else {
          message.error("Invalid JSON structure. Please provide a valid JSON file.");
        }
      } catch (error) {
        message.error("Error parsing the JSON file.");
      }
    };
    reader.readAsText(file); // Read file content
    return false; // Prevent default upload behavior
  };

  return (
    <Card>
      <Row gutter={ROW_GUTTER}>
        <Col xs={24} sm={24} md={12}>
          <Button type="primary" danger onClick={handleExportJSON} block disabled={objects.length === 0}>
            ЭКСПОРТ
          </Button>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Upload
            beforeUpload={handleImportFile}
            accept=".json"
            showUploadList={false}
			style={{ width: '100%', display: 'block' }}
          >
            <Button block>ИМПОРТ</Button>
          </Upload>
        </Col>
      </Row>
    </Card>
  );
};

export default ExportImportObjects;
