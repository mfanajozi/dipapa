import { Suspense } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/ui/status-badge"
import { formatDate } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockQueries = [
  {
    id: "q1",
    user_id: "u1",
    unique_id: "QRY-001",
    name: "John Smith",
    building: "North Tower",
    room_number: "A101",
    priority: "High",
    type: "Building",
    details: "Water leak in bathroom",
    status: "Pending",
    created_at: "2023-03-15T10:30:00Z",
    updated_at: "2023-03-15T10:30:00Z",
    reference: "REF-001",
  },
  {
    id: "q2",
    user_id: "u2",
    unique_id: "QRY-002",
    name: "Sarah Johnson",
    building: "South Tower",
    room_number: "B202",
    priority: "Medium",
    type: "General",
    details: "Wi-Fi connectivity issues",
    status: "Processing",
    created_at: "2023-03-14T14:45:00Z",
    updated_at: "2023-03-15T09:20:00Z",
    reference: "REF-002",
  },
  {
    id: "q3",
    user_id: "u3",
    unique_id: "QRY-003",
    name: "Michael Brown",
    building: "East Tower",
    room_number: "C303",
    priority: "Low",
    type: "Password Reset",
    details: "Unable to login to student portal",
    status: "Closed",
    created_at: "2023-03-13T09:15:00Z",
    updated_at: "2023-03-14T11:30:00Z",
    reference: "REF-003",
  },
  {
    id: "q4",
    user_id: "u4",
    unique_id: "QRY-004",
    name: "Emily Wilson",
    building: "West Tower",
    room_number: "D404",
    priority: "High",
    type: "Building",
    details: "No electricity in room",
    status: "Processing",
    created_at: "2023-03-12T16:20:00Z",
    updated_at: "2023-03-13T08:45:00Z",
    reference: "REF-004",
  },
  {
    id: "q5",
    user_id: "u5",
    unique_id: "QRY-005",
    name: "David Lee",
    building: "North Tower",
    room_number: "E505",
    priority: "Medium",
    type: "General",
    details: "Room key not working",
    status: "Pending",
    created_at: "2023-03-11T11:10:00Z",
    updated_at: "2023-03-11T11:10:00Z",
    reference: "REF-005",
  },
]

const columns = [
  {
    accessorKey: "unique_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "building",
    header: "Building",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }: any) => {
      const priority = row.getValue("priority")
      const colorMap: Record<string, string> = {
        High: "text-red-600 font-medium",
        Medium: "text-amber-600",
        Low: "text-green-600",
      }

      return <span className={colorMap[priority] || ""}>{priority}</span>
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

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
  { label: "Closed", value: "Closed" },
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
              <Skeleton className="h-4 w-16 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-16 mr-4" />
              <Skeleton className="h-6 w-20 mr-4 rounded-full" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function QueriesPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Queries</h1>
        <p className="text-muted-foreground">Manage and respond to user queries.</p>
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

      <Suspense fallback={<QueriesTableSkeleton />}>
        <DataTable
          columns={columns}
          data={mockQueries}
          searchKey="name"
          searchPlaceholder="Search by name..."
          filterKey="status"
          filterOptions={statusOptions}
        />
      </Suspense>
    </div>
  )
}

