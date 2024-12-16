export const addObject = (object) => ({
  type: "ADD_OBJECT",
  payload: object,
});

export const deleteAll = () => ({
  type: "DELETE_ALL",
});

export const deleteObject = (object) => ({
  type: "DELETE_OBJECT",
  payload: object,
});

export const updateObjectPosition = (index, position) => ({
  type: "UPDATE_OBJECT_POSITION",
  payload: { index, position },
});

export const updateObjectByCurrentSelected = () => ({
  type: "UPDATE_OBJECT_CURRENT_SELECTED",
  payload: {  },
});

export const updateCurrentSelected = (index, newObj) => ({
  type: "UPDATE_CURRENT_SELECTED",
  payload: { index, newObj },
});

export const selectObject = (object) => ({
  type: "SELECT_OBJECT",
  payload: { object },
});

export const updateImportedObjects = (objects) => ({
  type: "UPDATE_IMPORTED_OBJECTS",
  payload: objects,
});