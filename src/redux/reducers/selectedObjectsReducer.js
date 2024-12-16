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
        if(state.currentSelectedObject){
          let index = state.currentSelectedObject.index+1;
          let newimtes = state.selectedObjects.slice(index);
          return {
            ...state,
            selectedObjects: newimtes,
          };
        }else{
          return state;
        }
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