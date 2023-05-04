import {createSlice} from '@reduxjs/toolkit'
const serviceSlice=createSlice({

    name:"services",
    initialState:{
        service:{},
    },

    reducers:{
        setService: (state,action)=>{
            state.service=action.payload
        },
    }   
})


export const {setService }=serviceSlice.actions;
export default serviceSlice