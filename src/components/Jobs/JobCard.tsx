"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Briefcase, Clock, ArrowUpRight, Calendar, Users } from "lucide-react"
import { motion } from "framer-motion"
import { Job } from "@/components/constant/jobs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const [applicants, setApplicants] = useState<number | null>(null)

  useEffect(() => {
    setApplicants(Math.floor(Math.random() * 50) + 1)
  }, [])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 border border-gray-700"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
          <div className="flex flex-wrap gap-4 text-gray-300 mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-secondary" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-secondary" />
              <span>${job.salary.toLocaleString()}/year</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-secondary" />
              <span>{job.schedule}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-secondary border-secondary">
              {job.type}
            </Badge>
            <Badge variant="outline" className="text-secondary border-secondary">
              {job.experienceLevel}
            </Badge>
          </div>
        </div>
        <Link href={`/jobs/${job.id}`} className="sm:self-start">
          <Button className="bg-secondary hover:bg-secondary/90 text-black bg-secondary-color hover:bg-white font-semibold rounded-full px-6 py-3 transition-all duration-300">
            View Job
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
      <p className="text-gray-300 mb-6 line-clamp-3">{job.description}</p>
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-400">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-secondary" />
          <span>Posted on {formatDate(job.datePosted)}</span>
        </div>
        {applicants !== null && (
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-secondary" />
            <span>{applicants} applicants</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}