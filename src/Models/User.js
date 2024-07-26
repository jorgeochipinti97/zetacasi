import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    transactions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps:true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
