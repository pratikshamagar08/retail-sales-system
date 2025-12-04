import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import dashboardReducer from "../features/dashboard/dashboardSlice.js";
import productsReducer from "../features/products/productsSlice.js";
import storesReducer from "../features/stores/storesSlice.js";
import salesReducer from "../features/sales/salesSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    products: productsReducer,
    stores: storesReducer,
    sales: salesReducer,
  },
});

export default store;
