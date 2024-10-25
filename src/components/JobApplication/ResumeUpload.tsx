import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { FormData } from "./JobApplicationForm";

interface ResumeUploadProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
}

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [".pdf", ".doc", ".docx"];

const ResumeUpload: React.FC<ResumeUploadProps> = ({
  register,
  errors,
  setValue,
}) => {
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [coverLetterFileName, setCoverLetterFileName] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: "resume" | "coverLetter"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setValue(fieldName, undefined);
        if (fieldName === "resume") {
          setResumeFileName(null);
          setResumeError("File size exceeds 4MB. Please choose a smaller file.");
        } else {
          setCoverLetterFileName(null);
        }
        return;
      }
      setValue(fieldName, file);
      if (fieldName === "resume") {
        setResumeFileName(file.name);
        setResumeError(null);
      } else {
        setCoverLetterFileName(file.name);
      }
    } else {
      setValue(fieldName, undefined);
      if (fieldName === "resume") {
        setResumeFileName(null);
        setResumeError("Please upload your resume.");
      } else {
        setCoverLetterFileName(null);
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="border border-[#797979] rounded-[6px] p-3 sm:p-4 space-y-3 sm:space-y-4">
          <h4 className="text-xl sm:text-2xl font-bold text-gray-800">Resume *</h4>
          <p className="text-lg text-gray-700">
            Be sure to include an updated resume (PDF, DOC, DOCX).
          </p>
          <div className={`border-2 border-dashed rounded-[6px] p-3 sm:p-4 text-center ${errors.resume || resumeError ? 'border-red-500' : 'border-secondary-color'}`}>
            <Input
              type="file"
              accept={ACCEPTED_FILE_TYPES.join(",")}
              className="hidden"
              id="resume-upload"
              {...register("resume", {
                required: "Resume is required",
                onChange: (e) => handleFileUpload(e, "resume"),
              })}
            />
            <Label htmlFor="resume-upload" className="cursor-pointer">
              <p className="font-bold mb-1 sm:mb-2 text-sm sm:text-base text-gray-800">
                Click to Upload
              </p>
              <p className="text-xs sm:text-sm mb-1 sm:mb-2 text-gray-600">
                4 MB Max File Size
              </p>
              <svg
                className="mx-auto w-8 h-8 sm:w-12 sm:h-12 text-[#797979]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Label>
          </div>
          {resumeFileName && (
            <p className="text-sm text-green-600">
              File selected: {resumeFileName}
            </p>
          )}
          {(errors.resume || resumeError) && (
            <p className="text-red-500 mt-2 text-sm font-semibold">
              {errors.resume?.message as string || resumeError}
            </p>
          )}
        </div>
        <div className="border border-[#797979] rounded-[6px] p-3 sm:p-4 space-y-3 sm:space-y-4">
          <h4 className="text-xl sm:text-2xl font-bold text-gray-800">Cover Letter (Optional)</h4>
          <p className="text-lg text-gray-700">
            You may include a cover letter (PDF, DOC, DOCX).
          </p>
          <div className="border-2 border-dashed border-secondary-color rounded-[6px] p-3 sm:p-4 text-center">
            <Input
              type="file"
              accept={ACCEPTED_FILE_TYPES.join(",")}
              className="hidden"
              id="cover-letter-upload"
              {...register("coverLetter", {
                required: false,
                onChange: (e) => handleFileUpload(e, "coverLetter"),
              })}
            />
            <Label htmlFor="cover-letter-upload" className="cursor-pointer">
              <p className="font-bold mb-1 sm:mb-2 text-sm sm:text-base text-gray-800">
                Click to Upload
              </p>
              <p className="text-xs sm:text-sm mb-1 sm:mb-2 text-gray-600">
                4 MB Max File Size
              </p>
              <svg
                className="mx-auto w-8 h-8 sm:w-12 sm:h-12 text-[#797979]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Label>
          </div>
          {coverLetterFileName && (
            <p className="text-sm text-green-600">
              File selected: {coverLetterFileName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
