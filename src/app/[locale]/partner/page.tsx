import { unstable_setRequestLocale } from "next-intl/server";
import PartnerClient from "./PartnerClient";

export default function PartnerPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <PartnerClient />;
}
