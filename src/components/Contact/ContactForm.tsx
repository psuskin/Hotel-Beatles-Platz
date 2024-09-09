import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

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
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "Generally",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Optionally reset the form here
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "Generally",
          message: "",
          consent: false,
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-800 p-8"
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-primary outline-none transition"
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-primary outline-none transition"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-primary outline-none transition"
          required
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formState.phone}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-primary outline-none transition"
          required
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-primary outline-none transition"
        >
          <option value="Generally">Generally</option>
          <option value="Room reservation">Room reservation</option>
          <option value="Report a problem">Report a problem</option>
          <option value="press">Press</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleInputChange}
          rows={4}
          className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-primary outline-none transition"
          required
        ></textarea>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formState.consent}
          onChange={handleInputChange}
          className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
          required
        />
        <label htmlFor="consent" className="text-sm text-gray-300">
          Ich erteile meine jederzeit widerrufliche Einwilligung, von Hotel am
          Beatlesplatz Polat Hotelbetriebsgesellschaft mbH per E-Mail
          angeschrieben zu werden. Bitte beachten Sie unsere
          Datenschutzerklärung.
        </label>
      </div>
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500 text-white p-3 rounded-md mb-4"
          >
            Your message has been sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-4 bg-primary-color text-white rounded-md font-semibold flex items-center justify-center space-x-3 transition duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 disabled:opacity-50"
      >
        <span className="text-lg">
          {isSubmitting ? "Sending..." : "Send Message"}
        </span>
        <AnimatePresence>
          {!isSubmitting && (
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
                  ease: [0.32, 0, 0.67, 0], // easeOutCubic
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
