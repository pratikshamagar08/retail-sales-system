import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded hover:bg-slate-700 ${
      isActive ? "bg-slate-800 font-semibold" : ""
    }`;

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen px-4 py-6">
      <h2 className="text-xl font-semibold mb-6">Retail Sales System</h2>
      <nav className="space-y-1 text-sm">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/sales" className={linkClass}>
          Sales
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/stores" className={linkClass}>
          Stores & Regions
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
