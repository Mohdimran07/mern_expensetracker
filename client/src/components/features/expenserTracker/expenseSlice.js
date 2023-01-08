import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "./expenseService";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createExpense = createAsyncThunk(
  "goals/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.create(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET GOALS
export const getExpenseData = createAsyncThunk(
  "Expensedata/get",
  async (_, thunkAPI) => {
    console.log("CALLED API")
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.getData(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//UPDATE DATA
export const updateExpenseData = createAsyncThunk("Expensedata/update", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await expenseService.upDate(data, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})
// DELETE ITEM
export const deleteExpenseItem = createAsyncThunk("ExpenseData/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await expenseService.deleteItem(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message)
  }
})

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExpenseData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenseData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getExpenseData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateExpenseData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateExpenseData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log("action", action)
        const { arg: { id } } = action.meta
        console.log("idddd", id)
        if (id) {
          state.data = state.data.map(item => item._id === id ? action.payload : item)
        }
      })
      .addCase(updateExpenseData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteExpenseItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteExpenseItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log("action", action)
        state.data = state.data.filter((item) => item._id !== action.payload.id)
      })
      .addCase(deleteExpenseItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
});

export const { reset } = expenseSlice.actions;
export default expenseSlice.reducer;
