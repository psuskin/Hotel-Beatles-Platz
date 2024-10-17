import { unstable_setRequestLocale } from "next-intl/server";
import GalerieClient from "./GalerieClient";

export default function GaleriePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <GalerieClient />;
}
