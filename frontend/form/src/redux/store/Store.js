import { configureStore } from '@reduxjs/toolkit'
import Authslice from '../store/Authslice'
import userSlice from '../store/userSlice'

 const Store = configureStore({
  reducer: {
    auth: Authslice,
    getData:userSlice
  },
})

export default Store