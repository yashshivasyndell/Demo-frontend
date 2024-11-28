import { configureStore } from '@reduxjs/toolkit'
import Authslice from '../store/Authslice'


 const Store = configureStore({
  reducer: {
    auth: Authslice,
  },
})

export default Store