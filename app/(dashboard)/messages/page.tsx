import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockMessages = [
  {
    id: "m1",
    user_group: "All Students",
    title: "Important Announcement",
    message: "All students are reminded to complete their registration for the upcoming semester by March 31st.",
    from: "Management",
    date: "2023-03-15",
    time: "10:30:00",
  },
  {
    id: "m2",
    user_group: "Location",
    title: "Maintenance Notice",
    message:
      "The water supply in the North Tower will be interrupted on Saturday from 9 AM to 12 PM due to maintenance.",
    from: "Support",
    date: "2023-03-14",
    time: "14:45:00",
  },
  {
    id: "m3",
    user_group: "All Students",
    title: "Wi-Fi Password Change",
    message:
      "The Wi-Fi password will be changed on March 20th. The new password will be provided at the reception desk.",
    from: "Support",
    date: "2023-03-13",
    time: "09:15:00",
  },
  {
    id: "m4",
    user_group: "User",
    title: "Payment Reminder",
    message:
      "This is a reminder that your monthly payment is due on March 25th. Please ensure timely payment to avoid late fees.",
    from: "Management",
    date: "2023-03-12",
    time: "16:20:00",
  },
  {
    id: "m5",
    user_group: "All Students",
    title: "Holiday Schedule",
    message:
      "The administration office will be closed on March 21st for the public holiday. Normal operations will resume on March 22nd.",
    from: "Management",
    date: "2023-03-11",
    time: "11:10:00",
  },
]

const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "user_group",
    header: "User Group",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }: any) => {
      const message = row.getValue("message") as string
      return <div className="max-w-[300px] truncate">{message}</div>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => formatDate(row.getValue("date")),
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const message = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/messages/${message.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

function MessagesTableSkeleton() {
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
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-64 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Create and manage messages for users.</p>
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
          <Link href="/messages/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Message
          </Link>
        </Button>
      </div>

      <Suspense fallback={<MessagesTableSkeleton />}>
        <DataTable columns={columns} data={mockMessages} searchKey="title" searchPlaceholder="Search by title..." />
      </Suspense>
    </div>
  )
}

