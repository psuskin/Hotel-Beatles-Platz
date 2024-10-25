import React from "react";
import { jobs } from "@/components/constant/jobs";
import JobDetails from "@/components/Jobs/JobDetails";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.title} | Career Opportunities at HOTEL AM BEATLES-PLATZ`,
    description: `Join our team as a ${job.title}. ${job.description}`,
    keywords: `${job.title.toLowerCase()}, career, job opportunity, HOTEL AM BEATLES-PLATZ`,
    openGraph: {
      title: `${job.title} | Career Opportunities at HOTEL AM BEATLES-PLATZ`,
      description: `Join our team as a ${job.title}. ${job.description}`,
      images: [
        {
          url: "https://axzons.com/careers-og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${job.title} at HOTEL AM BEATLES-PLATZ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} | Career Opportunities at HOTEL AM BEATLES-PLATZ`,
      description: `Join our team as a ${job.title}. ${job.description}`,
      images: ["https://axzons.com/careers-twitter-image.jpg"],
    },
  };
}

const JobDetailsPage = ({ params }: { params: { id: string } }) => {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  return <JobDetails job={job} />;
};

export default JobDetailsPage;
