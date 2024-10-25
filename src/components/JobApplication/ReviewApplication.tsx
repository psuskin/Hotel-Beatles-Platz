import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { FormData } from "./JobApplicationForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ReviewApplicationProps {
  formData: Partial<FormData>;
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewApplication: React.FC<ReviewApplicationProps> = ({
  formData,
  onBack,
  onSubmit,
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const viewFile = (e: React.MouseEvent, file: File | null | undefined) => {
    e.preventDefault();
    e.stopPropagation();
    if (file instanceof File) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  const handleSubmit = () => {
    console.log("handleSubmit called in ReviewApplication");
    setShowConfirmDialog(true);
  };

  const confirmSubmit = () => {
    console.log("confirmSubmit called in ReviewApplication");
    setShowConfirmDialog(false);
    console.log("About to call onSubmit in ReviewApplication");
    onSubmit();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
        Review your application
      </h3>
      <p className="text-base sm:text-lg text-gray-700">
        The employer will also receive a copy of your application.
      </p>

      <div className="border-t border-gray-300 pt-4 sm:pt-6">
        <h4 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
          Contact Info
        </h4>
        <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {formData.firstName}{" "}
            {formData.lastName}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span>{" "}
            {formData.phoneNumber || "Not provided"}
          </p>
          <p>
            <span className="font-semibold">Email Address:</span>{" "}
            {formData.email}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 sm:pt-6">
        <h4 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
          Resume
        </h4>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Button
            type="button"
            className="w-full sm:w-[400px] h-[55px] bg-secondary-color text-white hover:bg-secondary-color/90 px-[30px] py-[15px] rounded-[6px] flex items-center justify-between"
            onClick={(e) => viewFile(e, formData.resume as File)}
            disabled={!formData.resume}
          >
            <span className="font-semibold text-[20px] leading-[25px]">
              Resume
            </span>
            <Eye size={24} className="text-white" />
          </Button>
          {formData.coverLetter && (
            <Button
              type="button"
              className="w-full sm:w-[400px] h-[55px] bg-secondary-color text-white hover:bg-secondary-color/90 px-[30px] py-[15px] rounded-[6px] flex items-center justify-between"
              onClick={(e) => viewFile(e, formData.coverLetter as File)}
            >
              <span className="font-semibold text-[20px] leading-[25px]">
                Cover Letter
              </span>
              <Eye size={24} className="text-white" />
            </Button>
          )}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-6 flex gap-4 flex-row justify-between items-center">
        <Button
          variant="outline"
          type="button"
          onClick={onBack}
          className="w-full sm:w-[270px] h-[40px] sm:h-[65px] px-4 sm:px-10 py-2 sm:py-5 text-sm sm:text-xl rounded-full text-secondary-color hover:bg-secondary-color hover:text-white border-secondary-color"
        >
          <span className="font-semibold">Back</span>
        </Button>
        <Button
          variant="default"
          type="button"
          onClick={handleSubmit}
          className="w-full sm:w-[270px] h-[40px] sm:h-[65px] px-4 sm:px-10 py-2 sm:py-5 text-sm sm:text-xl rounded-full text-white bg-secondary-color hover:bg-secondary-color/90"
        >
          <span className="font-semibold">Submit Application</span>
        </Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription className="text-lg sm:text-xl text-gray-700">
              Are you sure you want to submit your application? Once submitted,
              you won&apos;t be able to make any changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <AlertDialogCancel className="w-full sm:w-[200px] h-[50px] sm:h-[65px] text-base sm:text-xl font-semibold rounded-full border-secondary-color text-secondary-color">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmSubmit} 
              className="w-full sm:w-[200px] h-[50px] sm:h-[65px] bg-secondary-color text-white hover:bg-secondary-color/90 transition-colors duration-300 text-base sm:text-xl font-semibold rounded-full"
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReviewApplication;
