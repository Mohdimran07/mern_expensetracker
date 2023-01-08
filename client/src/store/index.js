import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/features/auth/authSlice";
import expenseSliceReducer from "../components/features/expenserTracker/expenseSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseSliceReducer,
  },
  
});
