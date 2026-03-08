import { redirect } from "next/navigation";

export default function NewInPage() {
  redirect("/products?filter=new");
}