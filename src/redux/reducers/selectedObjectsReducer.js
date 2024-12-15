const initialState = {
    selectedObjects: [],
  };
  
  const selectedObjectsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_OBJECT":
        return {
          ...state,
          selectedObjects: [...state.selectedObjects, action.payload],
        };
        case "UPDATE_OBJECT_POSITION": {
            const { index, position } = action.payload;
            const updatedObjects = [...state.selectedObjects];
            updatedObjects[index] = {
              ...updatedObjects[index],
              position_x: position.x,
              position_y: position.y,
            };
            return {
              ...state,
              selectedObjects: updatedObjects,
            };
        }
      default:
        return state;
    }
  };
  
export default selectedObjectsReducer;  