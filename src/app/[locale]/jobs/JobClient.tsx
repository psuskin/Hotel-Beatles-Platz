
import AllJobs from '@/components/Jobs/AllJobs';
import SubHeader from '@/components/SubHeader';
import { useTranslations } from 'next-intl';
import React from 'react';

const JobClient = () => {
  const t = useTranslations("jobsHeader");
    return (
        <>
        <SubHeader
        title={t("title")}
        description={t("description")}
        imageSrc="/images/frontView.jpg"
        />
      <AllJobs />
    </>
    );
};

export default JobClient;