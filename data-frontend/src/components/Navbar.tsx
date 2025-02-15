import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4 flex justify-between">
      <Link to="/" className="text-white font-bold">Drive System</Link>
      <div>
        {auth?.token ? (
          <button onClick={auth.logout} className="text-white">Logout</button>
        ) : (
          <>
            <Link to="/login" className="text-white mx-2">Login</Link>
            <Link to="/signup" className="text-white mx-2">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
