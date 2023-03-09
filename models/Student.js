import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types


const studentSchema = mongoose.Schema({
  name: {
    type: String,
    // required:true,
    min: 5,
    max: 30,
  },
  age: Number,
  gender: String,
  department:{
    type:ObjectId,
    ref:"Department"
  }
});

export default mongoose.model("Student", studentSchema);
