import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    address: {
      type: {
        street: String,
        city: String,
        state: String,
        zip: String,
      },
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    photoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model("Customer", customerSchema);
