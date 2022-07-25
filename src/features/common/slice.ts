import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SelectMenuType } from 'type/common';

export interface CommonState {
  select: SelectMenuType;
}

const initialState: CommonState = {
  select: 'STUDENT_1',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    selectMenu: (state, action: PayloadAction<SelectMenuType>) => {
      state.select = action.payload;
    },
  },
});

export const { selectMenu } = commonSlice.actions;

export default commonSlice.reducer;
