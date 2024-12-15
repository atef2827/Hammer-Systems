import { createSlice } from '@reduxjs/toolkit';

const objectSlice = createSlice({
  name: 'objects',
  initialState: {
    selectedObjects: [], // Global state to hold selected objects
  },
  reducers: {
    addObject(state, action) {
      state.selectedObjects.push(action.payload);
    },
  },
});

// Export actions and reducer
export const { addObject } = objectSlice.actions;
export default objectSlice.reducer;