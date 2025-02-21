const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "pending" },
    priority: { type: String, default: "low" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
