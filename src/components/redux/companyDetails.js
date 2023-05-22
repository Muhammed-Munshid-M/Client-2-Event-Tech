import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({

  name: 'company',
  initialState: {
    company: {},
    service: [],
    location: [],
  },

  reducers: {
    setCompany: (state, action) => ({ ...state, company: action.payload }),
    setServiceFiltered: (state, action) => ({ ...state, service: action.payload }),
    setLocationFiltered: (state, action) => ({ ...state, location: action.payload }),
  },
});

export const { setCompany, setServiceFiltered, setLocationFiltered } = companySlice.actions;
export default companySlice;
