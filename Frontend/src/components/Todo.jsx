import { useEffect, useState } from "react";
import "../css/Todo.css";
import axios from "axios";

export function Todo() {
  let [data, setData] = useState([]);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [status, setStatus] = useState("default");
  let [priority, setPriority] = useState("default");
  let [editingId, setEditingId] = useState(null);

  async function fetchData() {
    let res = await axios.get("https://todo-2-md10.onrender.com/todos");
    setData(res.data.todos);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addTask() {
    if (!title || !description)
      return alert("Title and Description are required!");
    let newTask = { title, description, status, priority };
    await axios.post("https://todo-2-md10.onrender.com/todos", newTask);
    setTitle("");
    setDescription("");
    setStatus("default");
    setPriority("default");
    fetchData();
    alert("Task is added");
  }

  async function deleteTask(id) {
    await axios.delete(`https://todo-2-md10.onrender.com/todos/delete/${id}`);
    fetchData();
    alert("task is deleted");
  }

  async function updateTask() {
    if (!title || !description)
      return alert("Title and Description are required!");
    let updatedTask = { title, description, status, priority };
    await axios.patch(
      `https://todo-2-md10.onrender.com/todos/update/${editingId}`,
      updatedTask
    );
    setTitle("");
    setDescription("");
    setStatus("default");
    setPriority("default");
    setEditingId(null);
    fetchData();
    alert("task is updated");
  }

  function handleEdit(task) {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setEditingId(task._id);
  }

  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "50px" }}>
        Todo Application
      </h1>
      <div className="input-main-dev">
        <label htmlFor="">Title</label>
        <input
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="">Description</label>
        <textarea
          placeholder="Enter Description Here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <br />
        <label htmlFor="">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="default">Default</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <br />
        <br />
        <label htmlFor="">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="default">Low</option>
          <option value="pending">Medium</option>
          <option value="completed">High</option>
        </select>
        <button onClick={editingId ? updateTask : addTask}>
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <div
        style={{
          width: "80%",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          margin: "auto",
          padding: "20px",
          marginTop: "50px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>My Tasks</h1>
        <div className="parent">
          {data.map((ele) => (
            <div key={ele._id} className="child">
              <h2 style={{ fontSize: "20px" }}>Title: {ele.title}</h2>
              <h2 style={{ fontSize: "20px" }}>
                Description: {ele.description}
              </h2>
              <h2 style={{ fontSize: "20px" }}>Status: {ele.status}</h2>
              <h2 style={{ fontSize: "20px" }}>Priority: {ele.priority}</h2>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="card-button"
                  onClick={() => deleteTask(ele._id)}
                >
                  Delete Task
                </button>
                <button className="card-button" onClick={() => handleEdit(ele)}>
                  Update Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
