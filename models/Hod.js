import mongoose from "mongoose";

const HodSchema = mongoose.Schema({
  name: {
    type: String,
    // required: true,
    min: 5,
    max: 30,
  },
  age: Number,
  gender:String,
  contactNo: Number,
});

export default mongoose.model("Hod", HodSchema);
