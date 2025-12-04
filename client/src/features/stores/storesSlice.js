import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient.js";

export const fetchStores = createAsyncThunk("stores/fetch", async () => {
  const res = await axiosClient.get("/stores");
  return res.data;
});

export const createStore = createAsyncThunk(
  "stores/create",
  async (store) => {
    const res = await axiosClient.post("/stores", store);
    return res.data;
  }
);

export const updateStore = createAsyncThunk(
  "stores/update",
  async (store) => {
    const { id, ...data } = store;
    const res = await axiosClient.put(`/stores/${id}`, data);
    return res.data;
  }
);

export const deleteStore = createAsyncThunk(
  "stores/delete",
  async (id) => {
    await axiosClient.delete(`/stores/${id}`);
    return id;
  }
);

const storesSlice = createSlice({
  name: "stores",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.items.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default storesSlice.reducer;
