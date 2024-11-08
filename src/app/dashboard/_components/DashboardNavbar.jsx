import Link from "next/link";
import React from "react";
import { Box, Image } from "@chakra-ui/react";
import NavbarRoutes from "./NavbarRoutes";

const Navbar = () => {
  return (
    <nav className="bg-[#0b0b0f] sticky w-full z-20 top-0 start-0 border-b border-gray-600 shadow-gray-800 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/workwiz.png" className="h-[54px]" alt="WorkWiz Logo" />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 ">
          <NavbarRoutes />
        </div>
        {/* <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8  md:flex-row md:mt-0">
            <li>
              <a
                href="#"
                className="block py-3 px-4 text-white rounded md:p-0 hover:text-red-600"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="block py-3 px-4 text-white rounded md:p-0 hover:text-red-600"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 px-4 text-white rounded md:p-0 hover:text-red-600"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 px-4 text-white rounded md:p-0 hover:text-red-600"
              >
                Contact
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
