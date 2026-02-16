import { Schema, Document, Model, models, model } from "mongoose";

export interface IMember {
  name: string;
  roll: string;
  email: string;
}

export interface ITeamRegistration extends Document {
  teamName: string;
  members: IMember[];
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roll: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { _id: false },
);

const TeamRegistrationSchema = new Schema<ITeamRegistration>(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
    },

    members: {
      type: [MemberSchema],
      required: true,
      validate: [
        {
          validator: function (members: IMember[]) {
            return members.length >= 1 && members.length <= 3;
          },
          message: "Team must have minimum 1 and maximum 3 members",
        },
        {
          validator: function (members: IMember[]) {
            const emails = members.map((m) => m.email.toLowerCase());
            return new Set(emails).size === emails.length;
          },
          message: "Duplicate member emails are not allowed in the same team",
        },
      ],
    },
  },
  { timestamps: true },
);

const TeamRegistration: Model<ITeamRegistration> =
  models.TeamRegistration ||
  model<ITeamRegistration>("TeamRegistration", TeamRegistrationSchema);

export default TeamRegistration;
