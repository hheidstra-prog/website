"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons
import { Menu as MenuType } from "@/app/lib/types";
import { Logo } from "../layout/Logo";

interface MobileMenuProps {
  menu: MenuType;
}

export default function MobileMenu({ menu }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Full-Screen Menu Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-white bg-opacity-10 backdrop-blur-md"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white pb-20 rounded-b-3xl">

            {/* Header Section */}
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Logo className="h-8" />
              </Link>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-gray-900"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col items-center justify-start h-full pt-8 space-y-6">
              <ul className="w-full max-w-md space-y-4 text-center">
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.link}
                      className="block w-full px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded-md"
                      onClick={() => setIsOpen(false)} // Close menu on click
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Additional Buttons */}
              <div className="w-full max-w-md mt-8 space-y-4">
                <button className="w-full py-3 font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
