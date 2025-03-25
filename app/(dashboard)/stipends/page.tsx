import { Suspense } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/ui/status-badge"
import { formatDate } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockStipends = [
  {
    id: "s1",
    first_name: "John",
    surname: "Smith",
    email: "john.smith@example.com",
    id_number: "9001015012087",
    query: "Request for stipend payment for March",
    status: "Pending",
    notes: "",
    updated_at: "2023-03-15T10:30:00Z",
  },
  {
    id: "s2",
    first_name: "Sarah",
    surname: "Johnson",
    email: "sarah.johnson@example.com",
    id_number: "9103025012088",
    query: "Stipend payment delayed for February",
    status: "Processing",
    notes: "Verifying bank details",
    updated_at: "2023-03-14T14:45:00Z",
  },
  {
    id: "s3",
    first_name: "Michael",
    surname: "Brown",
    email: "michael.brown@example.com",
    id_number: "8905125012089",
    query: "Incorrect stipend amount received",
    status: "Closed",
    notes: "Issue resolved, correct amount paid",
    updated_at: "2023-03-13T09:15:00Z",
  },
  {
    id: "s4",
    first_name: "Emily",
    surname: "Wilson",
    email: "emily.wilson@example.com",
    id_number: "9207035012090",
    query: "Missing January stipend payment",
    status: "Approved",
    notes: "Payment scheduled for next week",
    updated_at: "2023-03-12T16:20:00Z",
  },
  {
    id: "s5",
    first_name: "David",
    surname: "Lee",
    email: "david.lee@example.com",
    id_number: "9309045012091",
    query: "Request for stipend increase",
    status: "Rejected",
    notes: "Not eligible for increase at this time",
    updated_at: "2023-03-11T11:10:00Z",
  },
]

const columns = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "surname",
    header: "Surname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "id_number",
    header: "ID Number",
  },
  {
    accessorKey: "query",
    header: "Query",
    cell: ({ row }: any) => {
      const query = row.getValue("query")
      return <div className="max-w-[300px] truncate">{query}</div>
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
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({ row }: any) => formatDate(row.getValue("updated_at")),
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const stipend = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/stipends/${stipend.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
  { label: "Closed", value: "Closed" },
]

function StipendsTableSkeleton() {
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
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-32 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-48 mr-4" />
              <Skeleton className="h-6 w-20 mr-4 rounded-full" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function StipendsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Stipends</h1>
        <p className="text-muted-foreground">Manage and respond to stipend queries.</p>
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

      <Suspense fallback={<StipendsTableSkeleton />}>
        <DataTable
          columns={columns}
          data={mockStipends}
          searchKey="email"
          searchPlaceholder="Search by email..."
          filterKey="status"
          filterOptions={statusOptions}
        />
      </Suspense>
    </div>
  )
}

