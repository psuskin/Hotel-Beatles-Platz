"use client";

import React, { useState } from "react";
import { Job } from "@/components/constant/jobs";
import {
  MapPin,
  Briefcase,
  Clock,
  Phone,
  Mail,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import JobApplicationForm from "../JobApplication/JobApplicationForm";

interface JobDetailsProps {
  job: Job;
}

export default function JobDetails({ job }: JobDetailsProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicantCount, setApplicantCount] = useState(0);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen py-20 text-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div className="w-full lg:w-2/3" variants={itemVariants}>
            <div className="bg-gray-900 rounded-2xl p-8">
              <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-secondary" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-secondary" />
                  <span>${job.salary.toLocaleString()}/year</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-secondary" />
                  <span>{job.schedule}</span>
                </div>
              </div>
              <p className="mb-6 text-gray-300 text-lg leading-relaxed">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-gray-800 text-secondary rounded-full text-sm font-medium">
                  {job.type}
                </span>
                <span className="px-4 py-2 bg-gray-800 text-secondary rounded-full text-sm font-medium">
                  {job.experienceLevel}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-8">
                Posted on {formatDate(job.datePosted)}
              </p>

              {[
                { title: "About the Job", content: job.aboutTheJob },
                { title: "Responsibilities", content: job.responsibilities },
                { title: "Qualifications", content: job.qualifications },
                { title: "Benefits", content: job.benefits },
              ].map((section, index) => (
                <motion.div
                  key={index}
                  className="mb-8"
                  variants={itemVariants}
                >
                  <h2 className="text-2xl font-bold mb-4 text-secondary">
                    {section.title}
                  </h2>
                  {typeof section.content === "string" ? (
                    <p className="text-gray-300">{section.content}</p>
                  ) : (
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      {section.content.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="w-full lg:w-1/3" variants={itemVariants}>
            <div className="sticky top-20">
              <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-start gap-6">
                <Button 
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full h-16 px-6 flex items-center justify-center gap-2 text-xl font-semibold bg-secondary bg-secondary-color text-black hover:bg-white hover:text-black rounded-xl transition-all duration-300"
                >
                  Apply Now
                  <ArrowUpRight className="w-6 h-6" />
                </Button>
                <div className="bg-gray-900 rounded-xl p-6 w-full">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-secondary" />
                      <span className="text-lg text-gray-300">
                        +49 40 181 283 811
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-secondary" />
                      <span className="text-lg text-gray-300">
                        hotelambeatlesplatz.de
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    {[Instagram].map((Icon, index) => (
                      <Link
                        key={index}
                        href="https://www.instagram.com/hotelambeatlesplatz/"
                        className="bg-secondary-color/70 text-secondary p-2.5 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <JobApplicationForm
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        jobTitle={job.title}
        jobLocation={job.location}
      />
    </div>
  );
}
