import mongoose, { Schema } from "mongoose";

const {ObjectId} = mongoose.Schema.Types


const DepartmentSchema =new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    min: 5,
    max: 30,
  },
  hodId: {
    type:ObjectId,
    ref:"Hod",
    unique:true,
  },
  teacherId:[{
    type:ObjectId,
    ref:"Teacher"
  }],
  studentId:[{
    type:ObjectId,
    ref:"Student"
  }]
});

export default mongoose.model("Department", DepartmentSchema);
