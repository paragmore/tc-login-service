import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  address: {
    type: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    default: {},
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  photoUrl: {
    type: String,
    default: "",
  },
});

export const OTPModel = mongoose.model("Customer", customerSchema);
