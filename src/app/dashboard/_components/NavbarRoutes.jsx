"use client";
import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ButtonComponent } from "@/components/Button";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.includes("/admin");
  const isPlayerPage = pathname?.includes("/jobs");

  return (
    <>
      <div className="flex gap-x-8 ml-auto text-white">
        {isAdminPage || isPlayerPage ? (
          <Link href="/dashboard">
            <ButtonComponent buttonText={"Go back to dashboard"} />
          </Link>
        ) : (
          <Link href="/dashboard/admin/jobs">
            <ButtonComponent buttonText={"Admin Mode"} />
          </Link>
        )}

        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
          >
            <Icon as={IoPersonCircle} boxSize={46} color="white" />
          </MenuButton>
          <MenuList className="bg-[#8f0505] p-2 px-4 rounded-xl">
            <MenuItem afterSignOutUrl="/dashboard">
              Logout
              <Icon as={TbLogout} />
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

export default NavbarRoutes;
