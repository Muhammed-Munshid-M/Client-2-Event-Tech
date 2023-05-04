import {createSlice} from '@reduxjs/toolkit'
const companySlice=createSlice({

    name:"company",
    initialState:{
        company:{},
    },

    reducers:{
        setCompany: (state,action)=>{
            state.company=action.payload
        },
    }   
})


export const {setCompany }=companySlice.actions;
export default companySlice
