import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient.js";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async () => {
    const [salesRes, productsRes, storesRes] = await Promise.all([
      axiosClient.get("/sales"),
      axiosClient.get("/products"),
      axiosClient.get("/stores"),
    ]);

    const sales = salesRes.data;
    const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);
    const totalOrders = sales.length;
    const totalProducts = productsRes.data.length;
    const totalStores = storesRes.data.length;

    const revenueByRegion = sales.reduce((acc, s) => {
      acc[s.region] = (acc[s.region] || 0) + s.amount;
      return acc;
    }, {});

    const revenueByChannel = sales.reduce((acc, s) => {
      acc[s.channel] = (acc[s.channel] || 0) + s.amount;
      return acc;
    }, {});

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalStores,
      revenueByRegion,
      revenueByChannel,
    };
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    error: null,
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalStores: 0,
    revenueByRegion: {},
    revenueByChannel: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
