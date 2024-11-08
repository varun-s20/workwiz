import Link from "next/link";
import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {columns, CompanyColumns} from "./_components/columns"
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";

const CompaniesOverviewPage = async() => {

    const {userId} = auth();
    if(!userId){
        return redirect("/dashboard");
    }

    const companies = await db.company.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt: "desc"
        }
    })

    const formattedCompanies : CompanyColumns[] = companies.map(company => ({
        id: company.id,
        name: company.name? company.name: "",
        logo: company.logo? company.logo: "", 
        createdAt: company.createdAt ? format(company.createdAt.toLocaleDateString(), "MMMM dd, yyyy"): "N/A"
    }))
return (
    <div className="p-6">
        <div className="flex items-end justify-end"> 
            <Link href="/dashboard/admin/companies/create">
            <Button
            padding={"6"}
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
            <span className="mx-2">New Company</span>
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
    
        {/* datatable - List of jobs */}
        <div className="mt-6">
        <DataTable columns={columns} data={formattedCompanies} searchKey="name" />
        </div>
    </div>
);
}
export default CompaniesOverviewPage;