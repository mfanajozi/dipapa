'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for support tickets
const mockSupportTickets = [
  {
    id: "t1",
    title: "Login Issue",
    status: "Open",
    date: "2025-03-28",
  },
];
const columns = [
  {
    accessorKey: "title",
    header: "Ticket Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const ticket = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/support/${ticket.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function SupportPage() {
  const formattedTickets = mockSupportTickets.map(ticket => ({
    ...ticket,
    date: formatDate(ticket.date),
  }));

  return (
    <DataTable columns={columns} data={formattedTickets} searchKey="title" searchPlaceholder="Search by title..." />
  );
}
