'use client'
import { useEffect, useState } from "react"
import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for queries
const mockQueries = [
  {
    id: "q1",
    title: "Query about user data",
    description: "Need clarification on user data retrieval.",
    status: "Open",
  },
  {
    id: "q2",
    title: "Issue with API response",
    description: "The API is returning an error for user details.",
    status: "In Progress",
  },
  {
    id: "q3",
    title: "Feature request for notifications",
    description: "Request to add notifications for user actions.",
    status: "Closed",
  },
  {
    id: "q4",
    title: "Bug in user profile update",
    description: "User profile updates are not saving correctly.",
    status: "Open",
  },
  {
    id: "q5",
    title: "Feedback on dashboard layout",
    description: "Suggestions for improving the dashboard UI.",
    status: "In Progress",
  },
]

const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const query = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/queries/${query.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

function QueriesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="rounded-md border">
        <div className="h-12 border-b px-4 bg-muted/50" />
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center h-16 px-4 border-b last:border-0">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-64 ml-4" />
              <Skeleton className="h-4 w-32 ml-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function QueriesPage() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      const response = await fetch('/api/queries/all'); // Adjusted the API endpoint to fetch all queries
      const data = await response.json();
      // Sort queries: New status first, then Closed
      const sortedQueries = data.sort((a: { status: string }, b: { status: string }) => {
        if (a.status === "New" && b.status !== "New") return -1;
        if (a.status !== "New" && b.status === "New") return 1;
        return 0;
      });
      setQueries(sortedQueries);
    };

    fetchQueries();
  }, []);

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }: any) => {
        const query = row.original;
        return (
          <div>
            <textarea
              placeholder="Add a note..."
              onBlur={(e) => {
                // Logic to save the note with user info and timestamp
                const note = {
                  user: "Admin", // Replace with actual user info
                  timestamp: new Date().toISOString(),
                  content: e.target.value,
                };
                // Save note logic here
              }}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const query = row.original;

        return (
          <div className="flex justify-end">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/queries/${query.id}`}>View</Link>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Queries</h1>
        <p className="text-muted-foreground">Manage queries and feedback.</p>
      </div>

      <Suspense fallback={<QueriesTableSkeleton />}>
        <DataTable columns={columns} data={queries} searchKey="title" searchPlaceholder="Search by title..." />
      </Suspense>
    </div>
  )
}
