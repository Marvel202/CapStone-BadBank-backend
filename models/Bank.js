import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    firebaseId: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
    },

    // balance: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("Bank", bankSchema);
