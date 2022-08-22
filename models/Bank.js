import mongoose from "mongoose";

const TranSchema = new mongoose.Schema({ tran_date: Date, amount: Number });

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

    deposits: {
      type: [TranSchema],
      default: undefined,
    },

    withdrawal: {
      type: [TranSchema],
      default: undefined,
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

export default mongoose.model("Bank", bankSchema, "Trans", TranSchema);
