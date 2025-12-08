import mongoose, { Schema, model, models } from "mongoose";

const RegistrationSchema = new Schema(
  {
    username: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    year: { type: String, required: true },
    resumeLink: { type: String },

    github: { type: String },
    linkedin: { type: String },

    whyGfg: { type: String, required: true },

    domain1: { type: String, required: true },
    deviceId: { type: String,},
    avatar: { type: String },

  },
  { timestamps: true }
);

export default models.Registration || model("Registration", RegistrationSchema);
