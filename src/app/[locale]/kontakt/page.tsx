import { unstable_setRequestLocale } from "next-intl/server";
import ContactClient from "./ContactClient";

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ContactClient />;
}
