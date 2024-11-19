import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams(); // Get task ID from the URL parameters
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/todos/${id}`
        );
        const task = response.data.data;
        setTitle(task.title);
        setDescription(task.description);
        setIsComplete(task.isComplete);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Task not found");
      }
    };

    fetchTask();
  }, [id]);

  const updateIsComplete = async (status) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/todos/toggle/status/${id}`,
        {
          isComplete: status,
        }
      );
      setIsComplete(status); // Update local state
      if (status) {
        setSuccess("Task completed!");
      } else {
        setSuccess("Task incomplete!");
      }
      setError("");
    } catch (err) {
      console.error("Error updating task completion status:", err);
      setError("Failed to update completion status");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/todos/${id}`,
        {
          title,
          description,
        }
      );
      setSuccess("Task updated successfully!");
      setError("");

      // Optionally navigate to tasks page or clear the form
      setTimeout(() => {
        navigate("/yourTasks"); // Navigate to the tasks list after a brief delay
      }, 1000);
    } catch (err) {
      console.error("Error updating task:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while updating the task"
      );
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-6 rounded-lg shadow"
      >
        {success && <p className="text-green-600 text-center">{success}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => updateIsComplete(e.target.checked)} // Update the status when toggled
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Mark as complete
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
