import mongoose from "mongoose";

const PeopleSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    celular: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pais: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.People || mongoose.model("People", PeopleSchema);
