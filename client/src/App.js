import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import DeleteTask from "./pages/DeleteTask";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/yourTasks" element={<Tasks />} />
            <Route path="/createTask" element={<CreateTask />} />
            <Route path="/editTask/:id" element={<EditTask />} />
            <Route path="/deleteTask/:id" element={<DeleteTask />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
