require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
  })
);

app.get("/api/todos", async (req, res) => res.json(await Todo.find()));

app.post("/api/todos", async (req, res) => {
  const todo = await Todo.create({ title: req.body.title });
  res.status(201).json(todo);
});

app.put("/api/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log("API running")))
  .catch((err) => console.error(err));
