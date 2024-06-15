import "../index.css";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="flex">
        <div className="link flex m-2 px-10 py-5 w-60 justify-center bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-md shadow-sm text-lg font-medium">
          <Link className="link-decoration" to="/">
            Departments
          </Link>
        </div>
        <div className="link flex m-2 px-10 py-5 w-60 justify-center bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-md shadow-sm text-lg font-medium">
          <Link className="link-decoration" to="/About">
            About
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
