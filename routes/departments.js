import express from "express";
import mongoose, { Schema } from "mongoose";
import Departments from "../models/Departments.js";
import Hod from "../models/Hod.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
const router = express.Router();
// const toID = mongoose.Schema.Types.ObjectId;

router.post("/new", async (req, res) => {
  const newDepartment = await new Departments({
    name: req.body.name,
  });
  try {
    const savedDepartment = await newDepartment.save();
    res.status(200).json({ savedDepartment });
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", async (req, res) => {
  const deparments = await Departments.find();
  res.status(200).json(deparments);
});

router.get("/", async (req, res) => {
  const departments = await Departments.find();
  res.status(200).json(departments);
});

router.delete("/:id", async (req, res) => {
  try {  
    await Departments.findById(req.params.id)

    // console.log(department)

    // const teacherIds = department.teacherId
    // console.log(teacherIds)

    // Teacher.deleteMany({_id: { $in: teacherIds}});
    res.status(200).json("department is deleted");


  } catch (error) {
    console.log(error);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedDepartment = await Departments.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(500).json(err);
  }
});



export default router;
