import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormspark } from "@formspark/use-formspark";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FORMSPARK_FORM_ID = "6GdlX5fN2"; // TODO: Add your Formspark form ID here

const SendIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 2L11 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

const ContactForm: React.FC = () => {
  const t = useTranslations("contact");
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "Generally",
    message: "",
    consent: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);

    if (!formState.consent) {
      alert(t("consentRequired"));
      return;
    }

    try {
      await submit({
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        phone: formState.phone,
        subject: formState.subject,
        message: formState.message,
        consent: formState.consent,
      });
      setIsSuccess(true);
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "Generally",
        message: "",
        consent: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("submissionError"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 w-full">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        {t("formTitle")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-300">
            {t("firstName")}
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
            placeholder={t("firstNamePlaceholder")}
            className="h-12 bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-[#E68945] focus:border-transparent"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-300">
            {t("lastName")}
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
            placeholder={t("lastNamePlaceholder")}
            className="h-12 bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-[#E68945] focus:border-transparent"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300">
          {t("emailAddress")}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleInputChange}
          placeholder={t("emailPlaceholder")}
          className="h-12 bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-[#E68945] focus:border-transparent"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-300">
          {t("phoneNumber")}
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formState.phone}
          onChange={handleInputChange}
          placeholder={t("phonePlaceholder")}
          className="h-12 bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-[#E68945] focus:border-transparent"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-gray-300">
          {t("subject")}
        </Label>
        <Select
          name="subject"
          value={formState.subject}
          onValueChange={(value) =>
            setFormState((prev) => ({ ...prev, subject: value }))
          }
        >
          <SelectTrigger className="h-12 bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-[#E68945] focus:border-transparent">
            <SelectValue placeholder={t("subject")} />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white border-gray-600">
            <SelectItem value="Generally">
              {t("subjectOptions.generally")}
            </SelectItem>
            <SelectItem value="Room reservation">
              {t("subjectOptions.roomReservation")}
            </SelectItem>
            <SelectItem value="Report a problem">
              {t("subjectOptions.reportProblem")}
            </SelectItem>
            <SelectItem value="press">{t("subjectOptions.press")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-gray-300">
          {t("message")}
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleInputChange}
          placeholder={t("messagePlaceholder")}
          className="h-32 bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-[#E68945] focus:border-transparent"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="consent"
          checked={formState.consent}
          onCheckedChange={(checked) =>
            setFormState((prev) => ({ ...prev, consent: checked as boolean }))
          }
          className="bg-gray-700 border-gray-600 text-[#E68945] data-[state=checked]:bg-[#E68945] data-[state=checked]:text-white"
          required
        />
        <Label htmlFor="consent" className="text-sm text-gray-300">
          {t("consentText")}
        </Label>
      </div>
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500 text-white p-3 rounded-md mb-4"
          >
            {t("successMessage")}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="submit"
        disabled={submitting}
        className="w-full p-4 bg-[#E68945] text-white rounded-md font-semibold flex items-center justify-center space-x-3 transition duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E68945] focus:ring-opacity-50 disabled:opacity-50"
      >
        <span className="text-lg">
          {submitting ? t("sending") : t("sendMessage")}
        </span>
        <AnimatePresence>
          {!submitting && (
            <motion.div
              key="sendIcon"
              initial={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0,
                x: 100,
                y: -100,
                transition: {
                  duration: 0.5,
                  ease: [0.32, 0, 0.67, 0],
                },
              }}
            >
              <SendIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </form>
  );
};

export default ContactForm;
