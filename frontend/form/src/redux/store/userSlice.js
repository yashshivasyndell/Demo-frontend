import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading:true,
    error:null,
    user:[],
    verifiedUsers: 0,
    pendingUsers: 0,
    guestUser: 0
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
        state.verifiedUsers = action.payload.verifiedUsers;
        state.pendingUsers = action.payload.pendingUsers;
        state.guestUser = action.payload.guestUser

    })
    builder.addCase('ALL_USER_ERROR',(state,action)=>{
        state.loading = false,
        state.user = [],
        state.error = action.error
    })
})

export default dataReducer;