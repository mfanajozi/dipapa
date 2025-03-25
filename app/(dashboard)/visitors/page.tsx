import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/ui/status-badge"
import { formatDate, formatTimeClient } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockVisitors = [
  {
    id: "v1",
    full_name: "John Smith",
    email: "john.smith@example.com",
    visitor_code: "VC-12345",
    code_status: "Generated",
    date: "2023-03-20",
    time_entry: "10:00:00",
    time_exit: "",
  },
  {
    id: "v2",
    full_name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    visitor_code: "VC-12346",
    code_status: "Used",
    date: "2023-03-15",
    time_entry: "14:30:00",
    time_exit: "16:45:00",
  },
  {
    id: "v3",
    full_name: "Michael Brown",
    email: "michael.brown@example.com",
    visitor_code: "VC-12347",
    code_status: "Expired",
    date: "2023-03-10",
    time_entry: "",
    time_exit: "",
  },
  {
    id: "v4",
    full_name: "Emily Wilson",
    email: "emily.wilson@example.com",
    visitor_code: "VC-12348",
    code_status: "Generated",
    date: "2023-03-25",
    time_entry: "09:15:00",
    time_exit: "",
  },
  {
    id: "v5",
    full_name: "David Lee",
    email: "david.lee@example.com",
    visitor_code: "VC-12349",
    code_status: "Used",
    date: "2023-03-18",
    time_entry: "11:30:00",
    time_exit: "13:45:00",
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
    accessorKey: "visitor_code",
    header: "Code",
  },
  {
    accessorKey: "code_status",
    header: "Status",
    cell: ({ row }: any) => {
      return <StatusBadge status={row.getValue("code_status")} />
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => formatDate(row.getValue("date")),
  },
  {
    accessorKey: "time_entry",
    header: "Entry Time",
    cell: ({ row }: any) => {
      const time = row.getValue("time_entry")
      return time ? formatTimeClient(time as string) : "-"
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const visitor = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/visitors/${visitor.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

const statusOptions = [
  { label: "Generated", value: "Generated" },
  { label: "Used", value: "Used" },
  { label: "Expired", value: "Expired" },
]

function VisitorsTableSkeleton() {
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
              <Skeleton className="h-6 w-20 mr-4 rounded-full" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function VisitorsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Visitors</h1>
        <p className="text-muted-foreground">Manage visitor codes and access.</p>
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
        <Button asChild>
          <Link href="/visitors/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Generate Visitor Code
          </Link>
        </Button>
      </div>

      <Suspense fallback={<VisitorsTableSkeleton />}>
        <DataTable
          columns={columns}
          data={mockVisitors}
          searchKey="full_name"
          searchPlaceholder="Search by name..."
          filterKey="code_status"
          filterOptions={statusOptions}
        />
      </Suspense>
    </div>
  )
}

