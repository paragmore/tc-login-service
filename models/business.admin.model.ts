import mongoose, { Schema } from "mongoose";

export enum BusinessAdminRolesEnum {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}
const businessAdminSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    photoUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(BusinessAdminRolesEnum),
    },
  },
  { timestamps: true }
);

export const BusinessAdminModel = mongoose.model(
  "BusinessAdmin",
  businessAdminSchema
);
