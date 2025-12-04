import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "./salesSlice.js";

const SalesPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.sales);

  const [regionFilter, setRegionFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  const filteredSales = useMemo(() => {
    return items.filter((s) => {
      const regionOk = regionFilter === "all" || s.region === regionFilter;
      const channelOk = channelFilter === "all" || s.channel === channelFilter;
      return regionOk && channelOk;
    });
  }, [items, regionFilter, channelFilter]);

  const totalRevenue = filteredSales.reduce((sum, s) => sum + s.amount, 0);
  const totalQty = filteredSales.reduce((sum, s) => sum + s.quantity, 0);

  const uniqueRegions = Array.from(new Set(items.map((s) => s.region)));
  const uniqueChannels = Array.from(new Set(items.map((s) => s.channel)));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Sales Data Management</h2>

      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <label className="block mb-1">Region</label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">All</option>
              {uniqueRegions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Channel</label>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">All</option>
              {uniqueChannels.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-slate-500">Filtered Revenue</p>
          <p className="text-2xl font-bold">₹ {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-slate-500">Filtered Quantity</p>
          <p className="text-2xl font-bold">{totalQty}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-slate-500">Records</p>
          <p className="text-2xl font-bold">{filteredSales.length}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Sales Records</h3>
          {loading && (
            <span className="text-sm text-slate-500">Loading sales...</span>
          )}
        </div>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">ID</th>
              <th>Date</th>
              <th>Region</th>
              <th>Channel</th>
              <th>Qty</th>
              <th>Amount (₹)</th>
              <th>Customer Segment</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="py-2">{s.id}</td>
                <td>{s.date}</td>
                <td>{s.region}</td>
                <td>{s.channel}</td>
                <td>{s.quantity}</td>
                <td>{s.amount}</td>
                <td>{s.customerSegment}</td>
              </tr>
            ))}

            {filteredSales.length === 0 && !loading && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-slate-500">
                  No sales found for selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPage;
