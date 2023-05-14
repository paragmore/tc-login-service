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
    stores: [
      {
        storeId: {
          type: Schema.Types.ObjectId,
          ref: "Store",
        },
        role: {
          type: String,
          enum: Object.values(BusinessAdminRolesEnum),
        },
      },
    ],
    photoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
export const BusinessAdminModel = mongoose.model(
  "BusinessAdmin",
  businessAdminSchema
);
