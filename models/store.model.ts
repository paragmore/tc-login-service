import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
  {
    name: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    businessType: {
      type: String,
    },
    businessDomain: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
    allowCreditReportAccess: {
      type: Boolean,
    },
    onlineStoreLive: {
      type: Boolean,
    },
    plan: {
      type: String,
    },
  },
  { timestamps: true }
);

export const StoreModel = mongoose.model("Store", storeSchema);
