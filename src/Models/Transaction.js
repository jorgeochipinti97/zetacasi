import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    amount: {
      type: Number,
    },
    phone: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps,
  }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
