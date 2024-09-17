import { ButtonComponent } from "@/components/Button";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const JobsPageOverview = async () => {
  return (
    <div className="p-8">
      <div className="flex items-end justify-end">
        <Link href={"/dashboard/admin/create"}>
          <Button
            rounded={"full"}
            bg={"#0b0b0f"}
            color={"white"}
            _hover={{
              bg: "#c1c1c1",
              color: "black",
              transition:
                "background-color 0.3s easeInOut, color 0.3s easeInOut",
              "& .box-icon": {
                bg: "black",
                color: "white",
                transition:
                  "background-color 0.7s easeInOut, color 0.7s easeInOut",
              },
            }}
            className="border-2 border-white rounded-full p-2 text-sm"
          >
            <span className="mx-2">New Job</span>
            <Box
              as="span"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="white"
              color="black"
              width="28px"
              height="28px"
              ml={2}
              className="box-icon rounded-full"
            >
              <FaPlus />
            </Box>
          </Button>
        </Link>
      </div>

      {/* datatable - list of jobs */}
    </div>
  );
};

export default JobsPageOverview;
