"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useRouter } from "next/navigation";
import { avatars } from "@/lib/utils";
import Image from "next/image";

const options = [
  "Web Dev",
  "App Dev",
  "AI/ML",
  "System Development",
  "BlockChain",
  "Game Dev",
  "Cloud",
  "CyberSecurity",
  "Competitive Programming",
];

const Registration_form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    contact: "",
    email: "",
    whyGfg: "",
    domain1: "",
    domain2: "",
    github: "",
    linkedin: "",
    resumeLink: "",
    year: "",
    deviceId: "",
    avatar: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (id === "contact" && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      setFormData((prev) => ({ ...prev, deviceId: result.visitorId }));
    };

    loadFingerprint();
  }, []);

  useEffect(() => {

    const verifyDevice = async () => {
      if (!formData.deviceId) return;

      const res = await fetch("/api/check-device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: formData.deviceId }),
      });

      const data = await res.json();

      if (data.registered) {
        router.push("/user-card");
      }
    };

    verifyDevice();
  }, [formData.deviceId]);

  const handleSubmit = async () => {
    try {
      console.log("Submitting deviceId:", formData.deviceId);

      if (!formData.deviceId) {
        alert("Device verification failed. Please refresh the page.");
        return;
      }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        alert(`Validation Errors:, ${data.errors || data.message}`);
        return;
      }
      localStorage.setItem("id",data.saved._id)
      router.push("/user-card");
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };
  return (
    <div className="w-full max-w-md text-white bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
      <FieldSet>
        <FieldGroup className="space-y-2">
          <Field>
            <FieldLabel htmlFor="username" className="text-lg font-semibold">
              Full Name
            </FieldLabel>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/20"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="contact" className="text-lg font-semibold">
              Contact Info
            </FieldLabel>
            <Input
              id="contact"
              type="number"
              value={formData.contact}
              min="1"
              onChange={handleChange}
              placeholder="Phone number"
              className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/20 
             [appearance:textfield] 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-webkit-inner-spin-button]:appearance-none"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email" className="text-lg font-semibold">
              Email Info
            </FieldLabel>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="rollno@kiit.ac.in"
              className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/20"
            />
          </Field>

          <Field>
            <FieldLabel className="text-lg font-semibold">
              Choose Avatar
            </FieldLabel>

            <div className="grid grid-cols-4 gap-4 mt-2">
              {avatars.map((avatar) => {
                const optimizedImg = avatar.img.replace(
                  "/upload/",
                  "/upload/c_fill,w_96,h_96,q_auto,f_auto/"
                );

                return (
                  <div
                    key={avatar.id}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, avatar: avatar.img }))
                    }
                    className={`relative w-16 h-16 m-auto cursor-pointer rounded-full overflow-hidden transition-all bg-transparent ${
                      formData.avatar === avatar.img
                        ? "ring-2 ring-green-500 scale-110 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        : "ring-0 hover:ring-2 hover:ring-white/50"
                    }`}
                  >
                    <Image
                      src={optimizedImg}
                      alt={avatar.name}
                      fill
                      sizes="64px"
                      loading="lazy"
                      priority={false}
                      className="object-cover transition-opacity duration-300"
                    />
                  </div>
                );
              })}
            </div>

            <FieldDescription className="text-white/60">
              Select an avatar for your profile.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel className="text-lg font-semibold">Year</FieldLabel>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, year: value }))
              }
            >
              <SelectTrigger className="bg-black/20 border-white/20 text-white *:data-placeholder:text-white/50">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription className="text-white/60">
              Select your current academic year.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="resumeLink" className="text-lg font-semibold">
              Resume (Google Drive Link)
            </FieldLabel>

            <Input
              id="resumeLink"
              type="url"
              value={formData.resumeLink}
              onChange={handleChange}
              disabled={!formData.year}
              placeholder={
                formData.year
                  ? "https://drive.google.com/..."
                  : "Select your year first"
              }
              className={`bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/20 
      ${!formData.year ? "opacity-50 cursor-not-allowed" : ""}`}
              required={formData.year === "2" || formData.year === "3"}
            />

            <FieldDescription className="text-white/60">
              {formData.year === "1"
                ? "Optional for 1st year students."
                : formData.year === "2" || formData.year === "3"
                ? "Mandatory for 2nd & 3rd year students."
                : "Share a public Google Drive link. First Enter your year"}
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="github" className="text-lg font-semibold">
              GitHub Profile (Optional)
            </FieldLabel>
            <Input
              id="github"
              type="url"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/20"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="linkedin" className="text-lg font-semibold">
              LinkedIn Profile (Optional)
            </FieldLabel>
            <Input
              id="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/20"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="whyGfg" className="text-lg font-semibold">
              Why GFG?
            </FieldLabel>
            <Textarea
              id="whyGfg"
              value={formData.whyGfg}
              onChange={handleChange}
              placeholder="Tell us why you want to join GFG... (Minimum 5 words)"
              className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:ring-green-400/20 min-h-[100px]"
            />
          </Field>

          <Field>
            <FieldLabel className="text-lg font-semibold">
              Top Domain Preference 1
            </FieldLabel>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, domain1: value }))
              }
            >
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Select Domain" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-lg font-semibold">
              Top Domain Preference 2
            </FieldLabel>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, domain2: value }))
              }
            >
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Select Domain" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <p className="text-sm text-black/60 mt-4">
            Note: The first preferred domain will involve a hackathon-based
            evaluation. The second and third preferred domains will follow an
            interview-based evaluation format.
          </p>

          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Submit Registration
          </Button>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default Registration_form;
