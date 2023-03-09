import express from "express";
import Departments from "../models/Departments.js";
import Teacher from "../models/Teacher.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const Teachers = await Teacher.find();
  res.status(200).json(Teachers);
});

router.post("/", async (req, res) => {
  const TeacherName = req.body.teacherName;
  const TeacherAge = req.body.teacherAge;
  const department = req.body.department;

  const newTeacher = new Teacher({
    name: TeacherName,
    age: TeacherAge,
  });

  const savedTeacher = await newTeacher.save();
  const teacherId = savedTeacher._id;

  let departments = await Departments.findOne({ name: department });
  if (!departments) {
    departments = new Departments({ name: department });
  }

  departments.teacherId.push(teacherId);

  await departments.save();

  res.status(200).json(departments);
});

// DELETE TEACHER
router.delete("/:id", async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.status(200).json("Teacher is Deleted");
  } catch (error) {
    console.log(error);
  }
});

// UPDATE TEACHER
router.put("/:id", async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
