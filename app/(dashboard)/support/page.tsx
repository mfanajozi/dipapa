import { Suspense } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/ui/status-badge"
import { formatDate } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockSupportTickets = [
  {
    id: "st1",
    full_name: "John Smith",
    email: "john.smith@example.com",
    support_category: "Password Reset",
    support_details: "I forgot my password and need help resetting it.",
    status: "Pending",
    created_at: "2023-03-15T10:30:00Z",
    updated_at: "2023-03-15T10:30:00Z",
  },
  {
    id: "st2",
    full_name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    support_category: "Building",
    support_details: "The elevator in the South Tower is not working properly.",
    status: "Processing",
    created_at: "2023-03-14T14:45:00Z",
    updated_at: "2023-03-15T09:20:00Z",
  },
  {
    id: "st3",
    full_name: "Michael Brown",
    email: "michael.brown@example.com",
    support_category: "General",
    support_details: "I need information about the laundry facilities in the building.",
    status: "Closed",
    created_at: "2023-03-13T09:15:00Z",
    updated_at: "2023-03-14T11:30:00Z",
  },
  {
    id: "st4",
    full_name: "Emily Wilson",
    email: "emily.wilson@example.com",
    support_category: "Password Reset",
    support_details: "I need to reset my password for the student portal.",
    status: "Closed",
    created_at: "2023-03-12T16:20:00Z",
    updated_at: "2023-03-13T08:45:00Z",
  },
  {
    id: "st5",
    full_name: "David Lee",
    email: "david.lee@example.com",
    support_category: "Building",
    support_details: "There is a water leak in the bathroom of my room.",
    status: "Pending",
    created_at: "2023-03-11T11:10:00Z",
    updated_at: "2023-03-11T11:10:00Z",
  },
]

const columns = [
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "support_category",
    header: "Category",
  },
  {
    accessorKey: "support_details",
    header: "Details",
    cell: ({ row }: any) => {
      const details = row.getValue("support_details") as string
      return <div className="max-w-[300px] truncate">{details}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      return <StatusBadge status={row.getValue("status")} />
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }: any) => formatDate(row.getValue("created_at")),
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
]

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Closed", value: "Closed" },
]

function SupportTableSkeleton() {
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
              <Skeleton className="h-4 w-32 mr-4" />
              <Skeleton className="h-4 w-48 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-64 mr-4" />
              <Skeleton className="h-6 w-20 mr-4 rounded-full" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground">Manage and respond to support tickets.</p>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>

      <Suspense fallback={<SupportTableSkeleton />}>
        <DataTable
          columns={columns}
          data={mockSupportTickets}
          searchKey="full_name"
          searchPlaceholder="Search by name..."
          filterKey="status"
          filterOptions={statusOptions}
        />
      </Suspense>
    </div>
  )
}

