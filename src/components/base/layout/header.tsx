"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { MenuIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { shimmer, toBase64 } from "@/components/ui/generateBlur";
import logo from "../../../../public/base/images/ABiz-logo-white.png";

const navLinks = [
  { label: "Homepage", href: "#" },
  { label: "Vendor Listing", href: "#" },
  { label: "About us", href: "#" },
  { label: "Contact us", href: "#" },
  { label: "Login", href: "#" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 bg-[#003E78] text-white w-full shadow-md z-50">
      <div className="mx-auto flex items-center justify-between px-6 md:px-20 py-2 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="ABiz Home">
          <Image
            src={logo}
            alt="ABiz Logo"
            width={280}
            height={80}
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(280, 80)
            )}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-10 text-[15px] font-semibold tracking-wide"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "hover:opacity-90 transition-opacity",
                pathname === link.href && "underline underline-offset-4"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 bg-white text-black px-6 py-4 shadow z-40 transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "block py-3 border-b border-gray-200",
                pathname === link.href && "font-semibold text-[#003E78]"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="outline"
            className="mt-4 w-full border-[#003E78] text-[#003E78] hover:bg-[#003E78] hover:text-white transition"
            onClick={() => setMobileOpen(false)}
          >
            Get a Demo
          </Button>
        </div>
      )}
    </header>
  );
}
