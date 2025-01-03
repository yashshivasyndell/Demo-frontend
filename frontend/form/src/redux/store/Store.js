import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Authslice from '../store/Authslice'
import userSlice from '../store/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    auth: Authslice,
    getData:userSlice
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const Store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable immutable state check
      serializableCheck: false, // Optionally disable serializable check if needed
    })
})

const persistor = persistStore(Store)

export {Store,persistor}