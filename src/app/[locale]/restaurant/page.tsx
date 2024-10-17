import { unstable_setRequestLocale } from "next-intl/server";
import RestaurantClient from "./RestaurantClient";

export default function RestaurantPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <RestaurantClient />;
}
