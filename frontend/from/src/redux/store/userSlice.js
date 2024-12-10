import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading:true,
    error:null,
    user:[]
}

const dataReducer = createReducer(initialState,(builder)=>{
    builder.addCase('ALL_USER_LOADING',(state,action)=>{
        state.loading = true,
        state.user = [],
        state.error = null
    })
    builder.addCase('ALL_USER_SUCCESS',(state,action)=>{
        state.loading = false   ,
        state.user = action.payload.data
        state.error = null

    })
    builder.addCase('ALL_USER_ERROR',(state,action)=>{
        state.loading = false,
        state.user = [],
        state.error = action.error
    })
})

export default dataReducer;