import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/slices/userSlice'

const store = configureStore({
  reducer: {
    userData: userReducer,
  },
})

export default store;