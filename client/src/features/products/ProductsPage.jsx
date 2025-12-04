import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsSlice.js";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    status: "active",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      category: "",
      price: "",
      status: "active",
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
    };
    if (isEditing) {
      await dispatch(updateProduct(payload));
    } else {
      const { id, ...data } = payload;
      await dispatch(createProduct(data));
    }
    resetForm();
  };

  const handleEditClick = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      status: product.status,
    });
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (ok) {
      await dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product & Category Management</h2>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="border rounded w-full px-2 py-1"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <input
              className="border rounded w-full px-2 py-1"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Price (₹)</label>
            <input
              className="border rounded w-full px-2 py-1"
              type="number"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              className="border rounded w-full px-2 py-1"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>

          <div className="md:col-span-4 flex gap-3 mt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
              disabled={loading}
            >
              {isEditing ? "Update Product" : "Add Product"}
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
          <h3 className="text-lg font-semibold">Product List</h3>
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
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th className="w-32 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="py-2">{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.status}</td>
                <td className="text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="text-xs px-2 py-1 rounded border border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(p.id)}
                    className="text-xs px-2 py-1 rounded border border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-slate-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
