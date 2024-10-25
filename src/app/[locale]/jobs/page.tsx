import React from "react";
import JobClient from "./JobClient";
import { unstable_setRequestLocale } from "next-intl/server";

const Jobs = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <JobClient />;
};

export default Jobs;
