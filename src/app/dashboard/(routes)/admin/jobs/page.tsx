import { ButtonComponent } from "@/components/Button";
import { DataTable } from "@/components/ui/data-table";
import { columns, JobsColumns } from "./_components/columns";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { format } from "date-fns";

const JobsPageOverview = async () => {

  const {userId} = auth();

  if(!userId){
    return redirect("/dashboard");
  }

  const jobs = await db.job.findMany({
    where: {
      userId
    },
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  
  const formattedJobs : JobsColumns[] = jobs.map((job) => {
    const createdAt = job.createdAt ? new Date(job.createdAt) : null;

    return{
      id: job.id,
      title: job.title,
      company: "",
      category: job.category ?  job.category?.name : "N/A",
      isPublished: job.isPublished,
      createdAt: createdAt && !isNaN(createdAt.getTime()) ? format(createdAt, "MMMM do, yyyy") : "N/A"
    }
  })

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
      <div className="mt-6">
        <DataTable columns={columns} data={formattedJobs} searchKey="title" />
      </div>
    </div>
  );
};

export default JobsPageOverview;
