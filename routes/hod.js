import express from "express";
import Departments from "../models/Departments.js";
import Hod from "../models/Hod.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const Hods = await Hod.find();
  res.status(200).json(Hods);
});

router.post("/", async (req, res) => {
  const HodName = req.body.hodName;
  const HodAge = req.body.hodAge;
  const department = req.body.department;

  let departments = await Departments.findOne({ name: department });
  if (!departments) {
    departments = new Departments({ name: department });
  }

  if (departments.hodId == null) {
    const newHod = new Hod({
      name: HodName,
      age: HodAge,
    });
    const savedHod = await newHod.save();
    const hodsId = savedHod._id;

    departments.hodId = hodsId;
    await departments.save();
  } else {
    res.status(200).json("hod already exits");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Hod.findByIdAndDelete(req.params.id);
    res.status(200).json("hod is Deleted");
  } catch (error) {
    res.json("error")
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedHod = await Hod.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHod);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
