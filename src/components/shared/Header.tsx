"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAVLINKS, WEBSITE_NAME } from "@/lib/constants";
import CartButton from "../cart/cart-button";
import CartDrawer from "../cart/cart-drawer";
import { showToast } from "@/lib/toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    showToast.signedOut();
    await signOut({ callbackUrl: "/" });
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-light tracking-[0.25em] uppercase hover:text-primary hover:opacity-70 transition-all"
          >
            {WEBSITE_NAME}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase">
            {NAVLINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {session ? (
              <div className="hidden md:flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 text-sm tracking-wide hover:text-primary transition-colors">
                      <div className="flex items-center gap-2">
                        {session.user.image ? (
                          <Image
                            src={session.user.image}
                            alt={session.user.name ?? ""}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-stone-500 font-medium">
                            {session.user.name?.[0]?.toUpperCase() ?? "?"}
                          </span>
                        )}
                        <div className="flex flex-col text-start">
                          <p>Welcome, {session.user?.name?.split(" ")[0]}</p>
                          <span className="text-slate-400 text-xs">
                            Manage account ▾
                          </span>
                        </div>
                      </div>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-40" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>

                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-1.5 cursor-pointer"
                        >
                          Dashboard
                          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/wishlist"
                          className="cursor-pointer"
                        >
                          Wishlist
                          <DropdownMenuShortcut>⇧⌘W</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/orders"
                          className="cursor-pointer"
                        >
                          Orders
                          <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer">
                          Settings
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/contact" className="cursor-pointer">
                          Contact
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        asChild
                        disabled={session.user.role !== "ADMIN"}
                        className={
                          session.user.role !== "ADMIN" ? "hidden" : ""
                        }
                      >
                        <Link href="/admin" className="cursor-pointer">
                          Admin
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <button
                          onClick={handleSignOut}
                          className="text-destructive w-full text-left"
                        >
                          Sign out
                        </button>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-sm tracking-widest uppercase hover:text-primary transition-colors"
              >
                Sign in
              </Link>
            )}

            <CartButton />

            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border bg-background px-6 py-6 flex flex-col gap-5 text-sm tracking-widest uppercase">
            <Link href="/products" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
            <Link
              href="/products?category=new"
              onClick={() => setMenuOpen(false)}
            >
              New In
            </Link>
            <Link
              href="/products?category=sale"
              onClick={() => setMenuOpen(false)}
            >
              Sale
            </Link>
            <hr className="border" />
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  My Account
                </Link>
                <button
                  className="text-left text-muted-foreground"
                  // onClick={() => signOut({ callbackUrl: "/" })}
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
            )}
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
};

export default Header;
