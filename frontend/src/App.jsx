import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(`${API_URL}/tasks`, { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>DevOps Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "10px", width: "70%" }}
      />

      <button onClick={addTask} style={{ padding: "10px", marginLeft: "10px" }}>
        Add
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginTop: "10px" }}>
            {task.title}
            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;