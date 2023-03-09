import mongoose from "mongoose";

const TeacherSchema = mongoose.Schema({
  name: {
    type: String,
  },
  age: Number,
  gender: String,
});

export default mongoose.model("Teacher", TeacherSchema);
