import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header className="bg-blue-500 text-white h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Daily Docket</h1>
        <p className="text-xl mb-8">
          Your ultimate tool for organizing daily tasks and boosting
          productivity.
        </p>
        <Link to="/createTask">
          <button className="bg-white text-blue-500 py-2 px-6 rounded shadow hover:bg-gray-200 transition duration-200">
            Get Started
          </button>
        </Link>
      </header>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Task Management</h3>
              <p>
                Organize your tasks with ease and stay on top of your daily
                goals.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Reminders</h3>
              <p>
                Never forget a deadline with our customizable reminder system.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Analytics</h3>
              <p>
                Track your productivity and improve your workflow over time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
