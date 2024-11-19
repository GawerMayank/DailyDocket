import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <div className="flex items-center text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
        <FaClipboardList className="mr-2" />
        <Link to="/">Daily Docket</Link>
      </div>
      <div className="space-x-4">
        <Link to="/yourTasks">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            Your Tasks
          </button>
        </Link>
        <Link to="/createTask">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200">
            Create Task
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
