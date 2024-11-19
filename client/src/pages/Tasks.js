import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons

const Tasks = () => {
  const [tasks, setTasks] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/todos");

        // Extract tasks from the response object
        if (response.data && Array.isArray(response.data.data)) {
          setTasks(response.data.data); // Set tasks if it's an array
        } else {
          setError("Unexpected data format received");
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching tasks"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  // Check if there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl font-bold mb-4">No tasks found</h1>
        <p className="mb-4">Create one now!</p>
        <Link to="/createTask">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            Create Task
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      <h1 className="text-3xl font-bold mb-4">All Tasks</h1>
      <ul className="w-full max-w-lg space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border rounded-lg shadow-md p-6 bg-white hover:shadow-xl transition duration-200"
          >
            <strong className="block text-lg mb-2">Title: {task.title}</strong>
            <p className="text-gray-600 mb-2">
              Description: {task.description}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Status: {task.isComplete ? "Completed" : "Pending"}
            </p>
            <div className="flex space-x-4">
              <Link to={`/editTask/${task._id}`}>
                <button className="flex items-center bg-yellow-500 text-white py-2 px-3 rounded hover:bg-yellow-600 transition duration-200">
                  <FaEdit className="mr-1" />
                  Edit
                </button>
              </Link>
              <Link to={`/deleteTask/${task._id}`}>
                <button className="flex items-center bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition duration-200">
                  <FaTrash className="mr-1" />
                  Delete
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
