"use client";

import React, { useState, useEffect } from "react";
import { jobs, Job } from "@/components/constant/jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobCard from "./JobCard";
import { useTranslations } from "next-intl";

interface Filters {
  type: string | null;
  schedule: string | null;
  experienceLevel: string | null;
}

export default function AllJobs() {
  const t = useTranslations('jobs');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    type: null,
    schedule: null,
    experienceLevel: null,
  });
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        !selectedLocation ||
        selectedLocation === "all" ||
        job.location.includes(selectedLocation);

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (value === null) return true;
        return job[key as keyof Job] === value;
      });

      return matchesSearch && matchesLocation && matchesFilters;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, selectedLocation, filters]);

  const handleFilterChange = (key: keyof Filters, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation(null);
    setFilters({
      type: null,
      schedule: null,
      experienceLevel: null,
    });
  };

  const locations = Array.from(new Set(jobs.map((job) => job.location)));

  const formatOptionValue = (
    value: string | number | string[] | Date
  ): string => {
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return String(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black text-white"
    >
      {/* <h1 className="text-5xl font-bold mb-8">{t('title')}</h1> */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="pl-12 w-full h-14 text-lg border-gray-700 rounded-xl bg-gray-800 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={selectedLocation || undefined}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger className="w-full md:w-1/3 h-14 text-lg border-gray-700 rounded-xl bg-gray-800 text-white">
              <SelectValue placeholder={t('selectLocation')} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="all">{t('allLocations')}</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="w-full md:w-auto mt-4 text-secondary bg-white text-black transition-colors duration-300"
        >
          {showFilters ? t('hideFilters') : t('showFilters')}
          {showFilters ? (
            <ChevronUp className="ml-2" />
          ) : (
            <ChevronDown className="ml-2" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {Object.entries(filters).map(([key, value]) => (
              <Select
                key={key}
                value={value || undefined}
                onValueChange={(newValue) =>
                  handleFilterChange(
                    key as keyof Filters,
                    newValue === "all" ? null : newValue
                  )
                }
              >
                <SelectTrigger className="w-full h-12 border-gray-700 rounded-xl bg-gray-800 text-white">
                  <SelectValue
                    placeholder={t(key as 'type' | 'schedule' | 'experienceLevel')}
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="all">
                    {t('all')} {t(key as 'type' | 'schedule' | 'experienceLevel')}
                  </SelectItem>
                  {Array.from(
                    new Set(jobs.map((job) => job[key as keyof Job]))
                  ).map((option) => (
                    <SelectItem
                      key={formatOptionValue(option)}
                      value={formatOptionValue(option)}
                    >
                      {formatOptionValue(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            <Button
              onClick={resetFilters}
              variant="secondary"
              className="h-12 bg-secondary text-black hover:bg-secondary/90"
            >
              {t('resetFilters')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="space-y-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <JobCard job={job} />
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-center py-12 bg-gray-900 rounded-2xl"
          >
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              {t('noJobsFound')}
            </h3>
            <p className="text-gray-400">
              {t('noJobsFoundDescription')}{' '}
              <button
                onClick={resetFilters}
                className="text-secondary hover:underline ml-1"
              >
                {t('resetAllFilters')}
              </button>
              .
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
