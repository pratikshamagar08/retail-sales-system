import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";

const Topbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
      <h1 className="text-lg font-semibold">Control Panel</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          {user?.name} ({user?.role})
        </span>
        <button
          onClick={() => dispatch(logout())}
          className="text-sm px-3 py-1 rounded border border-slate-300 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
