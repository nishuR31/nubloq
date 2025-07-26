import mongoose from "mongoose";
import required from "../utils/required.js";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true,required("username")]
    },
    firstName: {
        type: String,
        required: [true,required("firstname")]
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true,required("email")],
        unique: true,
    },
    password: {
        type: String,
        required: [true,required("password")]
    },
    bio: {
        type: String,
        default: ""
    },
    occupation: {
        type: String,
    },
    photoUrl: {
        type: String,
        default: ""
    },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    facebook: { type: String, default: "" },


}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.pre("findByIdAndUpdate", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    const hashed = await bcrypt.hash(update.password, 10);
    this.setUpdate({ ...update, password: hashed });
  }
  next();
});



let  User = mongoose.model("User", userSchema);
export default User;