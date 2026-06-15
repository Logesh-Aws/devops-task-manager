const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongodb:27017/taskdb";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});