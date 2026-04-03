import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadBill,
  getItemsLastMonth,
  getTotalByItem,
  handleQuery,
} from "../controllers/billController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadBill);
router.get("/items-last-month", getItemsLastMonth);
router.get("/total/:item", getTotalByItem);
router.post("/query", handleQuery);

export default router;
