const initialState = {
    selectedObjects: [],
    currentSelectedObject: null
  };
  
  const selectedObjectsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_OBJECT":
        return {
          ...state,
          selectedObjects: [...state.selectedObjects, action.payload],
        };
        case "DELETE_OBJECT":
            // Create a shallow copy of the array
            const newItems = [...state.selectedObjects];
            
            // Remove the item at the specified index
            newItems.splice(action.payload.index, 1);
        
            return {
              ...state,
              selectedObjects: newItems,
            };
        
      case "DELETE_ALL":
        return {
          ...state,
          selectedObjects: [],
        };
      case "SELECT_OBJECT":
        return {
          ...state,
          currentSelectedObject: action.payload.object,
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
      case "UPDATE_OBJECT_CURRENT_SELECTED": {
            const updatedObjects = [...state.selectedObjects];
            updatedObjects[state.currentSelectedObject.index] = state.currentSelectedObject;
            return {
              ...state,
              selectedObjects: updatedObjects,
            };
        }
      case "UPDATE_CURRENT_SELECTED": {
            const { newObj } = action.payload;
              return {
                ...state,
                currentSelectedObject: newObj,
              };
        }
      case "UPDATE_IMPORTED_OBJECTS":
        return {
          ...state,
          selectedObjects: action.payload,
        };
      default:
        return state;
    }
  };
  
export default selectedObjectsReducer;  