import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStores,
  createStore,
  updateStore,
  deleteStore,
} from "./storesSlice.js";

const StoresPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.stores);

  const [form, setForm] = useState({
    id: null,
    name: "",
    region: "",
    channel: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      region: "",
      channel: "",
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (isEditing) {
      await dispatch(updateStore(payload));
    } else {
      const { id, ...data } = payload;
      await dispatch(createStore(data));
    }
    resetForm();
  };

  const handleEditClick = (store) => {
    setForm({
      id: store.id,
      name: store.name,
      region: store.region,
      channel: store.channel,
    });
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    const ok = window.confirm("Delete this store / sales channel?");
    if (ok) {
      await dispatch(deleteStore(id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Region & Store Management</h2>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">
          {isEditing ? "Edit Store / Sales Channel" : "Add Store / Sales Channel"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block text-sm mb-1">Store / Channel Name</label>
            <input
              className="border rounded w-full px-2 py-1"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Region</label>
            <input
              className="border rounded w-full px-2 py-1"
              name="region"
              value={form.region}
              onChange={handleChange}
              placeholder="West, North, South, etc."
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Channel Type</label>
            <input
              className="border rounded w-full px-2 py-1"
              name="channel"
              value={form.channel}
              onChange={handleChange}
              placeholder="POS, Online, Marketplace..."
            />
          </div>

          <div className="md:col-span-3 flex gap-3 mt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
              disabled={loading}
            >
              {isEditing ? "Update Store" : "Add Store"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded border text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Stores & Channels</h3>
          {loading && (
            <span className="text-sm text-slate-500">Saving / Loading...</span>
          )}
        </div>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Region</th>
              <th>Channel</th>
              <th className="w-32 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="py-2">{s.id}</td>
                <td>{s.name}</td>
                <td>{s.region}</td>
                <td>{s.channel}</td>
                <td className="text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(s)}
                    className="text-xs px-2 py-1 rounded border border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(s.id)}
                    className="text-xs px-2 py-1 rounded border border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && !loading && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-slate-500">
                  No stores found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoresPage;
