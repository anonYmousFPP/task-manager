import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;