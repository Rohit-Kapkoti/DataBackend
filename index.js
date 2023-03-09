import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studenRoute from "./routes/student.js";
import teacherRoute from "./routes/teacher.js";
import departmentRoute from "./routes/departments.js";
import hodsRoute from "./routes/hod.js";

const app = express();
dotenv.config();
app.use(express.json());


mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(express.json());

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS,CREATE"
  );
  next();
});

app.use("/student", studenRoute);
app.use("/teacher", teacherRoute);
app.use("/department", departmentRoute);
app.use("/hod", hodsRoute);

app.listen(8090, () => {
  console.log("server is running");
});
