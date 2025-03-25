import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate, formatTimeClient } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockEvents = [
  {
    id: "e1",
    user_group: "All Students",
    title: "Welcome Orientation",
    event_details:
      "Join us for the welcome orientation for new students. Learn about campus facilities, services, and meet fellow students.",
    location: "Main Hall, North Tower",
    date: "2023-03-20",
    time: "10:00:00",
  },
  {
    id: "e2",
    user_group: "Location",
    title: "Career Fair",
    event_details:
      "Connect with potential employers at our annual career fair. Bring your resume and dress professionally.",
    location: "Conference Center, Main Campus",
    date: "2023-03-25",
    time: "13:00:00",
  },
  {
    id: "e3",
    user_group: "All Students",
    title: "Wellness Workshop",
    event_details:
      "Learn stress management techniques and wellness practices to help you maintain balance during your studies.",
    location: "Recreation Room, South Tower",
    date: "2023-03-22",
    time: "15:30:00",
  },
  {
    id: "e4",
    user_group: "User",
    title: "Study Group Formation",
    event_details: "Meet other students in your program to form study groups for the upcoming exams.",
    location: "Library, East Tower",
    date: "2023-03-18",
    time: "16:00:00",
  },
  {
    id: "e5",
    user_group: "All Students",
    title: "Game Night",
    event_details: "Join us for a fun evening of board games, video games, and socializing with fellow students.",
    location: "Common Room, West Tower",
    date: "2023-03-24",
    time: "19:00:00",
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
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => formatDate(row.getValue("date")),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }: any) => {
      const time = row.getValue("time") as string
      return time ? formatTimeClient(time) : ""
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const event = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/content/events/${event.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

function EventsTableSkeleton() {
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
              <Skeleton className="h-4 w-48 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-32 mr-4" />
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-16 mr-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">Create and manage events.</p>
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
          <Link href="/content/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Link>
        </Button>
      </div>

      <Suspense fallback={<EventsTableSkeleton />}>
        <DataTable columns={columns} data={mockEvents} searchKey="title" searchPlaceholder="Search by title..." />
      </Suspense>
    </div>
  )
}

