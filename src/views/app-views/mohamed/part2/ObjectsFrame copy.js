import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Switch } from "antd";
import { updateObjectPosition } from "redux/actions/selectedObjectsActions";

const ObjectsFrame = () => {
  const dispatch = useDispatch();
  const savedObjects = useSelector((state) => state.selectedObjects.selectedObjects);
  const [isGrid, setIsGrid] = useState(true);
  const [draggingObject, setDraggingObject] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Track the mouse offset
  const [localPositions, setLocalPositions] = useState(
    savedObjects.reduce((acc, obj, index) => {
      acc[index] = { x: obj.position_x || 0, y: obj.position_y || 0 };
      return acc;
    }, {})
  );

  const toggleGrid = (checked) => {
    setIsGrid(checked);
  };

  const handleMouseDown = (e, index) => {
    const rect = e.target.getBoundingClientRect();
    setDraggingObject(index);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (draggingObject !== null) {
      const rect = e.target.parentNode.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
	  console.log('newY', newY);
	  console.log('newX', newX);

		setLocalPositions((prev) => ({
		  ...prev,
		  [draggingObject]: { x: newX, y: newY },
		}));
    }
  };

  const handleMouseUp = () => {
    if (draggingObject !== null) {
      // Dispatch the final position to Redux
      const finalPosition = localPositions[draggingObject];
      dispatch(updateObjectPosition(draggingObject, finalPosition));
      setDraggingObject(null); // Stop dragging
    }
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
        position: "relative", // Important for absolutely positioned children
        padding: "0px 10px",
        overflow: "hidden", // Prevent dragging outside the card
      }}
      headStyle={{ color: "#fff" }}
      extra={
        <div style={{ display: "flex", alignItems: "center", color: "#fff" }}>
          <span style={{ marginRight: 8 }}>сетка</span>
          <Switch checked={isGrid} onChange={toggleGrid} />
        </div>
      }
      onMouseMove={handleMouseMove} // Track mouse movements
      onMouseUp={handleMouseUp} // Dispatch the final position on mouse release
    >
      {savedObjects.length > 0 ? (
        savedObjects.map((obj, index) => (
          <div
            key={index}
            style={{
            //   position: "absolute",
            //   left: localPositions[index].x + "px",
            //   top: localPositions[index].y + "px",
			...(obj.position_x !== undefined && obj.position_y !== undefined ? { position: "absolute", left: localPositions[index].x+ "px", top: localPositions[index].y+ "px", } : {}),
              cursor: "grab",
              transform: obj.rotate ? `rotate(${obj.rotate}deg)` : null,
            }}
            onMouseDown={(e) => handleMouseDown(e, index)} // Start dragging
          >
            <img
              src={`/img/objects/${obj.src}`}
              alt={`Object ${obj.id}`}
              style={{
                maxWidth: "100px",
                borderRadius: "8px",
              }}
            />
          </div>
        ))
      ) : (
        <p style={{ color: "#fff", textAlign: "center" }}>No objects saved yet.</p>
      )}
    </Card>
  );
};

export default ObjectsFrame;
