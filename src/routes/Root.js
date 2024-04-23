import "../index.css";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav style={{display: 'flex'}}>
        <div className="link">
          <Link className="link-decoration" to="/">
            Departments
          </Link>
        </div>
        <div className="link">
          <Link className="link-decoration" to="/About">
            About
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
