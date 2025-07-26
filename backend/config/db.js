import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB fired successfully");
  } catch (error) {
    console.error(`MongoDB extinguished : ${error}`);
  }
};

export default db;
