import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'fuels',
  initialState: {
    items: {},
  },
  reducers: {
    update(state, action) {
      action.payload.forEach((item) => state.items[item.id] = item);
    },
  },
});

export { actions as fuelsActions };
export { reducer as fuelsReducer };
