"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import ContactInfo from "./ContactInfo";
import ResumeUpload from "./ResumeUpload";
import ReviewApplication from "./ReviewApplication";
import { schema } from "@/schemas/jobSchema";
import { MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

export const validateFileSize = (file: File | undefined) => {
  if (file && file.size > MAX_FILE_SIZE) {
    return false;
  }
  return true;
};

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobLocation: string;
}

const steps = ["Contact Info", "Resume", "Review"];

export type FormData = z.infer<typeof schema> & {
  jobTitle: string;
  jobLocation: string;
};

export default function JobApplicationForm({
  isOpen,
  onClose,
  jobTitle,
  jobLocation,
}: JobApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      jobTitle,
      jobLocation,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsSubmitted(false);
      reset({
        jobTitle,
        jobLocation,
      });
    }
  }, [isOpen, reset, jobTitle, jobLocation]);

  const onSubmit = (data: FormData) => {
    console.log("onSubmit called in JobApplicationForm");
    if (!data.coverLetter) {
      delete data.coverLetter;
    }
    const fullApplicationData = {
      ...data,
      jobTitle,
      jobLocation,
    };
    console.log(fullApplicationData, "Full application data");
    setIsSubmitted(true);
  };

  const handleNext = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      if (currentStep === 1) {
        const resumeFile = getValues().resume;
        if (!resumeFile) {
          setError("resume", {
            type: "manual",
            message: "Please upload your resume",
          });
          return;
        }
      }
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const getFieldsToValidate = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0:
        return ["firstName", "lastName", "email"];
      case 1:
        return ["resume"];
      default:
        return [];
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ContactInfo register={register} errors={errors} />;
      case 1:
        return (
          <ResumeUpload
            register={register}
            errors={errors}
            setValue={setValue}
          />
        );
      case 2:
        return (
          <ReviewApplication
            formData={getValues()}
            onBack={handleBack}
            onSubmit={handleSubmit(onSubmit)}
          />
        );
      default:
        return null;
    }
  };

  const renderStepIndicator = (index: number) => {
    if (index < currentStep) {
      return (
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-secondary-color flex items-center justify-center">
          <Check className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
      );
    } else if (index === currentStep) {
      return (
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-secondary-color flex items-center justify-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white"></div>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
          <div className="w-6 h-6 sm:w-6 sm:h-6 rounded-full bg-gray-500"></div>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[100vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center mt-6 sm:mt-8 md:mt-10 space-y-6 sm:space-y-8 md:space-y-10">
            <DialogTitle className="text-2xl sm:text-3xl md:text-[36px] font-bold text-secondary-color">
              Application Submitted
            </DialogTitle>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl md:text-[24px] font-bold text-black">
                {jobTitle}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[#797979] flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2" />
                {jobLocation}
              </p>
            </div>
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-8 border-secondary-color rounded-full flex items-center justify-center">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-secondary-color"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#222222]">
                Your application was sent to Hotel am Beatles Platz 
              </h4>
              <p className="text-sm sm:text-base md:text-lg text-[#222222] max-w-2xl mx-auto">
                Thank you for your interest in Hotel am Beatles Platz and for
                taking the time to apply for this position. We received your
                application and we&apos;re looking forward to reviewing it. If
                your application seems like a good fit for the position, we will
                contact you soon.
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-[36px] font-bold text-secondary-color text-center">
                Apply to Hotel am Beatles Platz
              </DialogTitle>
            </DialogHeader>
            <div className="border-b border-gray-700 my-2 sm:my-4"></div>
            <div className="relative flex flex-col items-start gap-2 sm:gap-[7.49px] w-full h-[60px] sm:h-[80.93px] mb-4 sm:mb-6">
              <div className="absolute w-[calc(100%-50px)] md:w-[610px] lg:w-[620px] h-[2px] left-[20px] sm:left-[102px] top-[18px] sm:top-[24px] bg-gray-500"></div>
              <div className="flex justify-between items-start w-full h-full z-10">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex flex-col items-center w-1/6  sm:w-[250px]"
                  >
                    {renderStepIndicator(index)}
                    <span className="text-xs sm:text-sm text-center text-black mt-1 sm:mt-2">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-black">
                {jobTitle}
              </h2>
              <p className="text-base sm:text-lg text-[#797979] flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2" />
                {jobLocation}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 sm:mt-6">{renderStep()}</div>
              {currentStep < 2 && (
                <div className="border-t border-gray-700 mt-4 sm:mt-6 pt-4 sm:pt-6 flex gap-4 flex-row justify-between items-center">
                  <Button
                    type="button"
                    onClick={handleBack}
                    className={`w-full sm:w-[270px] h-[40px] sm:h-[65px] px-4 sm:px-10 py-2 sm:py-5 text-sm sm:text-xl rounded-full font-semibold transition-colors duration-200  border-secondary-color ${
                      currentStep === 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-secondary-color text-white hover:bg-white hover:text-secondary-color border"
                    }`}
                    disabled={currentStep === 0}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-[270px] h-[40px] sm:h-[65px] px-4 sm:px-10 py-2 sm:py-5 text-sm sm:text-xl rounded-full text-white hover:text-secondary-color font-semibold "
                  >
                    {currentStep === steps.length - 1 ? "Review" : "Next"}
                  </Button>
                </div>
              )}
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
