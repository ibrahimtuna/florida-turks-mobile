import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CATEGORY_ITEM, COMPANY } from '../types.ts';

type State = {
  categories: CATEGORY_ITEM[];
  companies: COMPANY[];
};

const initialState: State = {
  categories: [],
  companies: [],
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyCategories: (state, action: PayloadAction<CATEGORY_ITEM[]>) => {
      state.categories = action.payload;
    },
    setCompanies: (state, action: PayloadAction<COMPANY[]>) => {
      state.companies = action.payload;
    },
  },
});

export const { setCompanyCategories, setCompanies } = companySlice.actions;

export default companySlice.reducer;
