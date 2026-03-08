import { NavlinkProps } from "@/types/navlink";

export const WEBSITE_NAME = process.env.WEBSITE_NAME || "Look";

export const NAVLINKS:NavlinkProps[] = [
  { label: "Shop", href: "/products" },
  { label: "New In", href: "/products?filter=new" },
  { label: "Sale", href: "/products?filter=sale" },
  { label: "Collections", href: "/collections" },
];