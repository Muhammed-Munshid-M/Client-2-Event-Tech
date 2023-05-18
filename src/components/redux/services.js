import {createSlice} from '@reduxjs/toolkit'
const serviceSlice=createSlice({

    name:"services",
    initialState:{
        service:{},
        checked1:[],
        checked2:[],
        checked3:[],
        checked4:[]
    },

    reducers:{
        setService: (state,action)=>{
            state.service=action.payload
        },
        setCheckedArray1: (state,action)=>{
            state.checked1=action.payload
        },
        setCheckedArray2: (state,action)=>{
            state.checked2=action.payload
        },
        setCheckedArray3: (state,action)=>{
            state.checked3=action.payload
        },
        setCheckedArray4: (state,action)=>{
            state.checked4=action.payload
        },
        setCheckedArray5: (state,action)=>{
            state.checked5=action.payload
        },
        setCheckedArray6: (state,action)=>{
            state.checked6=action.payload
        },
        setCheckedArray7: (state,action)=>{
            state.checked7=action.payload
        },
        setCheckedArray8: (state,action)=>{
            state.checked8=action.payload
        },
        // setRemove: (state,action)=>{
        //     const removeElement = state.checked1
        // },
    }   
})


export const {setService,setCheckedArray1,setCheckedArray2,setCheckedArray3,setCheckedArray4,setCheckedArray5,setCheckedArray6,setCheckedArray7,setCheckedArray8 }=serviceSlice.actions;
export default serviceSlice