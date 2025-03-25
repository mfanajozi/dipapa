import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockNews = [
  {
    id: "n1",
    category: "Building News",
    user_group: "All Students",
    title: "Maintenance Schedule for North Tower",
    article:
      "We will be conducting routine maintenance in the North Tower on Saturday, March 20th from 9 AM to 5 PM. Water supply may be interrupted during this time.",
    date: "2023-03-15",
    time: "10:30:00",
  },
  {
    id: "n2",
    category: "Building News",
    user_group: "Location",
    title: "New Security Measures Implemented",
    article:
      "We have upgraded our security systems across all buildings. Please ensure you always carry your access card.",
    date: "2023-03-14",
    time: "14:45:00",
  },
  {
    id: "n3",
    category: "Building News",
    user_group: "All Students",
    title: "Wi-Fi Network Upgrade",
    article:
      "The Wi-Fi network has been upgraded to provide faster and more reliable internet access throughout all buildings.",
    date: "2023-03-13",
    time: "09:15:00",
  },
  {
    id: "n4",
    category: "Building News",
    user_group: "User",
    title: "Fire Drill Announcement",
    article: "A fire drill will be conducted on Friday, March 17th at 2 PM. All residents are required to participate.",
    date: "2023-03-12",
    time: "16:20:00",
  },
  {
    id: "n5",
    category: "Building News",
    user_group: "Location",
    title: "New Laundry Facilities",
    article:
      "New laundry facilities have been installed in the basement of the South Tower. They are now available for use.",
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
      const news = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/content/news/${news.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

function NewsTableSkeleton() {
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

export default function NewsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">News</h1>
        <p className="text-muted-foreground">Create and manage building news articles.</p>
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
          <Link href="/content/news/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add News Article
          </Link>
        </Button>
      </div>

      <Suspense fallback={<NewsTableSkeleton />}>
        <DataTable columns={columns} data={mockNews} searchKey="title" searchPlaceholder="Search by title..." />
      </Suspense>
    </div>
  )
}

