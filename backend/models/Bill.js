import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  date: Date,
  totalAmount: Number,
  items: [
    {
      name: String,
      price: Number,
    },
  ],
});

export default mongoose.model("Bill", BillSchema);
