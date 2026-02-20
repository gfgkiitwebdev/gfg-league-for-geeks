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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [members, setMembers] = useState<Member[]>([
    { name: "", roll: "", email: "" },
  ]);

  const handleMemberChange = (
    index: number,
    field: keyof Member,
    value: string,
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
    if (isSubmitting) return;

    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const m of members) {
      if (!m.name.trim() || !m.roll.trim() || !m.email.trim()) {
        toast.error("All member fields are required");
        return;
      }

      if (!emailRegex.test(m.email)) {
        toast.error(`Invalid email format for ${m.name || "a member"}`);
        return;
      }
    }

    if (!validateEmails()) {
      toast.error("Duplicate emails are not allowed in the same team");
      return;
    }

    setIsSubmitting(true);

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

      // Reset form instead of reload (faster UX)
      setTeamName("");
      setMembers([{ name: "", roll: "", email: "" }]);

      localStorage.setItem("isRegistrated", "true");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      // 🔥 ALWAYS resets (no stuck button ever)
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl text-white bg-black/40 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl shadow-blue-900/20">
      <FieldSet>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          {/* Team Name */}
          <Field className="md:col-span-2">
            <FieldLabel className="text-lg font-semibold text-cyan-300">
              Team Name
            </FieldLabel>
            <Input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              className="bg-slate-900/60 border border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl"
            />
          </Field>

          {/* Members */}
          {members.map((member, index) => (
            <div
              key={index}
              className="md:col-span-2 border border-white/10 rounded-2xl p-5 bg-slate-900/50 backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-cyan-400 drop-shadow">
                  Member {index + 1}
                </h2>

                {members.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeMember(index)}
                    className="bg-red-600/80 hover:bg-red-500 border border-red-400/20"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel className="text-white/80">Name</FieldLabel>
                  <Input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    placeholder="Full Name"
                    className="bg-slate-900/60 border border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl"
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-white/80">Roll Number</FieldLabel>
                  <Input
                    type="text"
                    value={member.roll}
                    onChange={(e) =>
                      handleMemberChange(index, "roll", e.target.value)
                    }
                    placeholder="2305XXXX"
                    className="bg-slate-900/60 border border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl"
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-white/80">Email</FieldLabel>
                  <Input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                    placeholder="abc@gmail.com"
                    className="bg-slate-900/60 border border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl"
                  />
                </Field>
              </div>
            </div>
          ))}

          {/* Add Member */}
          <Field className="md:col-span-2">
            <Button
              type="button"
              onClick={addMember}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-blue-900/30 border border-white/10 transition-all"
            >
              + Add Member (Max 3)
            </Button>

            <FieldDescription className="text-xs text-white/60 mt-2 text-center">
              Minimum 1 and maximum 3 members allowed per team. Duplicate emails
              are not allowed.
            </FieldDescription>
          </Field>

          {/* Submit */}
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full mt-3 py-6 text-lg font-bold tracking-wide rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_200%] hover:from-blue-500 hover:via-cyan-400 hover:to-blue-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_45px_rgba(56,189,248,0.55)] border border-white/10 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md md:col-span-2
  "
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting ? "Submitting..." : "Submit Team Registration"}
              <span className="text-xl">{isSubmitting ? "⏳" : "🚀"}</span>
            </span>
          </Button>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default Registration_form;
