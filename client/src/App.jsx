import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";

import LoginPage from "./features/auth/LoginPage.jsx";
import DashboardPage from "./features/dashboard/DashboardPage.jsx";
import ProductsPage from "./features/products/ProductsPage.jsx";
import StoresPage from "./features/stores/StoresPage.jsx";
import SalesPage from "./features/sales/SalesPage.jsx";

import AppLayout from "./components/Layout/AppLayout.jsx";
import ProtectedRoute from "./components/Layout/ProtectedRoute.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
