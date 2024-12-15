import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Switch } from "antd";
import { motion } from "framer-motion";
import { updateObjectPosition } from "redux/actions/selectedObjectsActions";

const ObjectsFrame = () => {
  const dispatch = useDispatch();
  const savedObjects = useSelector((state) => state.selectedObjects.selectedObjects);
  const [isGrid, setIsGrid] = useState(true);

  const toggleGrid = (checked) => {
    setIsGrid(checked);
  };

  const handleDragEnd = (event, info, index) => {
    // Dispatch the final position to Redux on drag end
    const newX = info.point.x;
    const newY = info.point.y;
    console.log('newX', newX);
    console.log('newY', newY);
    dispatch(updateObjectPosition(index, { x: newX, y: newY }));
  };

  return (
    <Card
      title="карта заведения"
      style={{
        backgroundColor: "#000",
        background: isGrid
          ? "conic-gradient(from 90deg at 1px 1px, #000 90deg,#2d2121 0) calc(-1*2px) calc(-1*2px)/ calc(100%/12) calc(100%/12)"
          : "#000",
        color: "#fff",
        height: "90vh",
        position: "relative",
        padding: "0px 10px",
        overflow: "hidden",
      }}
      headStyle={{ color: "#fff" }}
      extra={
        <div style={{ display: "flex", alignItems: "center", color: "#fff" }}>
          <span style={{ marginRight: 8 }}>сетка</span>
          <Switch checked={isGrid} onChange={toggleGrid} />
        </div>
      }
    >
      {savedObjects.length > 0 ? (
        savedObjects.map((obj, index) => (
          <motion.div
            key={index}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 500,
              bottom: 500,
            }}
            dragMomentum={false}
            initial={{
              x: obj.position_x || 0,
              y: obj.position_y || 0,
            }}
            style={{
              position: "absolute",
              cursor: "grab",
              transform: obj.rotate ? `rotate(${obj.rotate}deg)` : null,
            }}
            onDragEnd={(event, info) => handleDragEnd(event, info, index)} // Save position on drag end
          >
            <img
              src={`/img/objects/${obj.src}`}
              alt={`Object ${obj.id}`}
              style={{
                maxWidth: "100px",
                borderRadius: "8px",
                pointerEvents: 'none'
              }}
            />
          </motion.div>
        ))
      ) : (
        <p style={{ color: "#fff", textAlign: "center" }}>No objects saved yet.</p>
      )}
    </Card>
  );
};

export default ObjectsFrame;