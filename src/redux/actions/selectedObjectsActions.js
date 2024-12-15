export const addObject = (object) => ({
  type: "ADD_OBJECT",
  payload: object,
});

export const updateObjectPosition = (index, position) => ({
  type: "UPDATE_OBJECT_POSITION",
  payload: { index, position },
});
