import { redirect } from "next/navigation";

export default function SalePage() {
  redirect("/products?filter=sale");
}