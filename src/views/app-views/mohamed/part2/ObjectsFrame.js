import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  updateObjectPosition,
  selectObject,
} from "redux/actions/selectedObjectsActions";

const ObjectsFrame = () => {
  const dispatch = useDispatch();
  const savedObjects = useSelector(
    (state) => state.selectedObjects.selectedObjects
  );
  const selectedItem = useSelector(
    (state) => state.selectedObjects.currentSelectedObject
  );
  const [isGrid, setIsGrid] = useState(true);
  const [dragConstraints, setDragConstraints] = useState(null);
  const containerRef = useRef(null);


  const handleSelect = (obj, index) => {
    dispatch(selectObject({ ...obj, index: index }));
  };

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragConstraints({
        top: 0,
        left: 0,
        right: rect.width - 120, // Adjust for element width
        bottom: rect.height - 120, // Adjust for element height
      });
    }
  }, []);

  const handleDragEnd = (event, info, index) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const localX = info.point.x - rect.left - 60; // Subtract container offset
    const localY = info.point.y - rect.top - 60;

    // Clamp to ensure the position is within the boundaries
    const finalX = Math.min(Math.max(localX, 0), rect.width);
    const finalY = Math.min(Math.max(localY, 0), rect.height);
    dispatch(updateObjectPosition(index, { x: finalX, y: finalY }));
  };

  return (
    <div
      style={{
        color: "#fff",
        width: "100%",
        position: "relative",
        backgroundColor: "#000",
        background: isGrid
          ? "conic-gradient(from 90deg at 1px 1px, #000 90deg,#2d2121 0) calc(-1*2px) calc(-1*2px)/ calc(100%/12) calc(100%/12)"
          : "#000",
        height: "90vh",
      }} 
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          padding: "0px",
          height: "90vh",
          overflow: "hidden", // Prevent overflow
        }}
      >
        {savedObjects.length > 0 ? (
          savedObjects.map((obj, index) => (
            <motion.div
              key={index}
              drag
              dragConstraints={dragConstraints}
              dragElastic={0}
              dragMomentum={false}
              initial={{
                x: obj.position_x || 0,
                y: obj.position_y || 0,
              }}
              style={{
                position: "absolute",
                cursor: "grab",
              }}
              onDragEnd={(event, info) => handleDragEnd(event, info, index)}
              onClick={() => handleSelect(obj, index)}
            >
              <img
                src={`/img/objects/${obj.src}`}
                alt={`Object ${obj.id}`}
                style={{
                  maxWidth: "120px",
                  width: obj.width ? (obj.width * 120) / 100 + "px" : "120px",
                  borderRadius: "8px",
                  pointerEvents: "none",
                  transform: obj.rotate ? `rotate(${obj.rotate}deg)` : null,
                  filter:
                    selectedItem?.index === index ? "invert(0)" : "invert(1)",
                }}
              />
            </motion.div>
          ))
        ) : (
          <p style={{ color: "#fff", textAlign: "center" }}>
            No objects saved yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ObjectsFrame;
