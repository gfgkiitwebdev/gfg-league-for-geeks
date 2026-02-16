"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Member = {
  name: string;
  roll: string;
  email: string;
};

const Registration_form = () => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { name: "", roll: "", email: "" },
  ]);

  const handleMemberChange = (
    index: number,
    field: keyof Member,
    value: string
  ) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    if (members.length >= 3) {
      toast.error("Maximum 3 members allowed");
      return;
    }
    setMembers([...members, { name: "", roll: "", email: "" }]);
  };

  const removeMember = (index: number) => {
    if (members.length === 1) {
      toast.error("Minimum 1 member required");
      return;
    }
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  const validateEmails = () => {
    const emails = members.map((m) => m.email.toLowerCase().trim());
    const unique = new Set(emails);
    return unique.size === emails.length;
  };

  const handleSubmit = async () => {
    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    for (const m of members) {
      if (!m.name || !m.roll || !m.email) {
        toast.error("All member fields are required");
        return;
      }
    }

    if (!validateEmails()) {
      toast.error("Duplicate emails are not allowed in the same team");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, members }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Team registered successfully 🚀");
      localStorage.setItem("isRegistrated", "true");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-5xl text-white bg-black/20 p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
      <FieldSet>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
          {/* Team Name */}
          <Field className="md:col-span-2">
            <FieldLabel className="text-base sm:text-lg font-semibold">
              Team Name
            </FieldLabel>
            <Input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/20"
            />
          </Field>

          {/* Members Section */}
          {members.map((member, index) => (
            <div
              key={index}
              className="md:col-span-2 border border-white/10 rounded-xl p-4 bg-black/30"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-green-400">
                  Member {index + 1}
                </h2>
                {members.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeMember(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    placeholder="Full Name"
                    className="bg-black/20 border-white/20 text-white"
                  />
                </Field>

                <Field>
                  <FieldLabel>Roll Number</FieldLabel>
                  <Input
                    type="text"
                    value={member.roll}
                    onChange={(e) =>
                      handleMemberChange(index, "roll", e.target.value)
                    }
                    placeholder="2305XXXX"
                    className="bg-black/20 border-white/20 text-white"
                  />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                    placeholder="rollno@kiit.ac.in"
                    className="bg-black/20 border-white/20 text-white"
                  />
                </Field>
              </div>
            </div>
          ))}

          {/* Add Member Button */}
          <Field className="md:col-span-2">
            <Button
              type="button"
              onClick={addMember}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              + Add Member (Max 3)
            </Button>
            <FieldDescription className="text-xs text-white/60 mt-1">
              Minimum 1 member and maximum 3 members allowed per team. Duplicate
              emails are not allowed.
            </FieldDescription>
          </Field>

          {/* Submit */}
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold md:col-span-2"
          >
            Submit Team Registration
          </Button>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default Registration_form;
