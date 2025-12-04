import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "./dashboardSlice.js";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    totalRevenue,
    totalOrders,
    totalProducts,
    totalStores,
    revenueByRegion,
    revenueByChannel,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Real-time Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-slate-500">Total Revenue</p>
          <p className="text-2xl font-bold">₹ {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-slate-500">Total Orders</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-slate-500">Products</p>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-slate-500">Stores / Channels</p>
          <p className="text-2xl font-bold">{totalStores}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Revenue by Region</h3>
          {Object.keys(revenueByRegion).length === 0 && (
            <p className="text-sm text-slate-500">No data</p>
          )}
          <ul className="space-y-1 text-sm">
            {Object.entries(revenueByRegion).map(([region, amount]) => (
              <li key={region} className="flex justify-between">
                <span>{region}</span>
                <span>₹ {amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Revenue by Channel</h3>
          {Object.keys(revenueByChannel).length === 0 && (
            <p className="text-sm text-slate-500">No data</p>
          )}
          <ul className="space-y-1 text-sm">
            {Object.entries(revenueByChannel).map(([channel, amount]) => (
              <li key={channel} className="flex justify-between">
                <span>{channel}</span>
                <span>₹ {amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
