import React from "react";
import BarClient from "./BarClient";
import { unstable_setRequestLocale } from "next-intl/server";

const Bar = ({
    params: { locale },
  }: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  return <BarClient />;
};

export default Bar;
