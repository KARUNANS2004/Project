import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import billRoutes from "./routes/billRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", billRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/billsDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
