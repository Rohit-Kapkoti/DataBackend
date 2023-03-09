import express from "express";
import Departments from "../models/Departments.js";
import Student from "../models/Student.js";
const router = express.Router();

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
  // console.log(students)
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const department = req.body.department;

  const newStudent = new Student({
    name: name,
    age: age,
  });

  const savedStudent = await newStudent.save();
  const studentId = savedStudent._id;

  let departments = await Departments.findOne({ name: department });
  if (!departments) {
    departments = new Departments({ name: department });
  }

  // department.s.push({ name: studentName, age: studentAge });
  departments.studentId.push(studentId);

  await departments.save();

  res.json(departments);
});

router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student is Deleted");
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
