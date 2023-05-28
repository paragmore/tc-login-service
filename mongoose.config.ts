import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

export const connectMongoDB = () => {
  console.log("hereee");
  const isProd = true
  const uri = isProd ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL_URI;
  if (!uri) {
    console.log("MONGODB_URI not present");
    return;
  }
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectionOptions)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};
