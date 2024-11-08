"use client"

import { cn } from "../../../../../../lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../../../components/ui/dropdown-menu"
import { Button } from "../../../../../../components/ui/button"
import { ArrowUpDown, Eye, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"
import React from "react"
  

export type CompanyColumns = {
  id: string
  name: string
  logo: string
  createdAt: string
}

export const columns: ColumnDef<CompanyColumns>[] = [
  {
    accessorKey: "logo",
    header: "Logo"
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
  },
  
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posted on
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
        const {id} = row.original;
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={`/dashboard/admin/jobs/${id}`}>
                    <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/dashboard/admin/jobs/${id}/applicants`}>
                    <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Applicants
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  },
]
