import mongoose from "mongoose";

const BankSchema = new mongoose.Schema(
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

    deposits: [{ amount: Number, tran_date: Date }],
    withdrawal: [{ amount: Number, tran_date: Date }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("Banks", BankSchema);
