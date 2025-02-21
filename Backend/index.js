const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/todos", todoRoutes);

const PORT = 8080;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error);
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server started on port ${PORT}`);
});
