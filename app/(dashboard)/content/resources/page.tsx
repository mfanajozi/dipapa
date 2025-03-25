import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockResources = [
  {
    id: "r1",
    category: "Wellness Resources",
    user_group: "All Students",
    title: "Mental Health Support Services",
    article:
      "Information about available mental health support services, including counseling, therapy, and crisis hotlines.",
    date: "2023-03-15",
    time: "10:30:00",
  },
  {
    id: "r2",
    category: "Wellness Resources",
    user_group: "All Students",
    title: "Healthy Eating on a Budget",
    article: "Tips and resources for maintaining a healthy diet while on a student budget.",
    date: "2023-03-14",
    time: "14:45:00",
  },
  {
    id: "r3",
    category: "Wellness Resources",
    user_group: "All Students",
    title: "Exercise and Fitness Resources",
    article: "Information about fitness facilities, classes, and tips for staying active.",
    date: "2023-03-13",
    time: "09:15:00",
  },
  {
    id: "r4",
    category: "Wellness Resources",
    user_group: "Location",
    title: "Local Healthcare Providers",
    article:
      "A list of healthcare providers and clinics in the area, including contact information and services offered.",
    date: "2023-03-12",
    time: "16:20:00",
  },
  {
    id: "r5",
    category: "Wellness Resources",
    user_group: "All Students",
    title: "Stress Management Techniques",
    article: "Effective techniques and resources for managing stress during academic periods.",
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
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => formatDate(row.getValue("date")),
  },
  {
    accessorKey: "article",
    header: "Content",
    cell: ({ row }: any) => {
      const article = row.getValue("article") as string
      return <div className="max-w-[300px] truncate">{article}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const resource = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/content/resources/${resource.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

function ResourcesTableSkeleton() {
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
              <Skeleton className="h-4 w-24 mr-4" />
              <Skeleton className="h-4 w-64 mr-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">Create and manage wellness resources.</p>
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
          <Link href="/content/resources/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Resource
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ResourcesTableSkeleton />}>
        <DataTable columns={columns} data={mockResources} searchKey="title" searchPlaceholder="Search by title..." />
      </Suspense>
    </div>
  )
}

