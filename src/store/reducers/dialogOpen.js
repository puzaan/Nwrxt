import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: true,
  close: false
};

const dailogeOpen = createSlice({
  name: 'dailogeOpen',
  initialState,
  reducers: {
    openDailog(state, action) {
      state.open = action.payload.open;
    },

    closeDailog(state, action) {
      state.close = action.payload.close;
    }
  }
});

export default dailogeOpen.reducer;

export const { openDailog, closeDailog } = dailogeOpen.actions;
