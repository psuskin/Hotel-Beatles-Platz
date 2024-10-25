import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { FormData } from "./JobApplicationForm";

interface ContactInfoProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-lg font-semibold text-gray-800">First Name *</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
            className="w-full h-[50px] border-[#797979] rounded-[6px] text-gray-800 placeholder-gray-500"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-lg font-semibold text-gray-800">Last Name *</Label>
          <Input
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
            className="w-full h-[50px] border-[#797979] rounded-[6px] text-gray-800 placeholder-gray-500"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-lg font-semibold text-gray-800">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber", { required: "Phone number is required" })}
            className="w-full h-[50px] border-[#797979] rounded-[6px] text-gray-800 placeholder-gray-500"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-lg font-semibold text-gray-800">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            className="w-full h-[50px] border-[#797979] rounded-[6px] text-gray-800 placeholder-gray-500"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
