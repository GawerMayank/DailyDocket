import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteTask = () => {
  const { id } = useParams(); // Get task ID from the URL parameters
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/todos/${id}`
        );
        setTask(response.data.data); // Adjust based on your response structure
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Task not found");
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todos/${id}`);
      setSuccess("Task deleted successfully!");
      setError("");

      // Navigate to tasks list after a brief delay
      setTimeout(() => {
        navigate("/yourTasks");
      }, 1000);
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete the task");
      setSuccess("");
    }
  };

  const handleCancel = () => {
    navigate("/yourTasks"); // Navigate back to the tasks list without deleting
  };

  if (!task) {
    return <p>Loading...</p>; // You can customize this loading state
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Delete Task</h1>
      <p className="mb-4">
        Are you sure you want to delete the task: <strong>{task.title}</strong>?
      </p>
      <div className="space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          Confirm Delete
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
        >
          Cancel
        </button>
      </div>
      {success && <p className="text-green-600 text-center mt-4">{success}</p>}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default DeleteTask;
