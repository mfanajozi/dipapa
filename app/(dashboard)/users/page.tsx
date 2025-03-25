import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockUsers = [
  {
    id: "u1",
    student_id: "ST12345",
    email: "john.doe@example.com",
    first_name: "John",
    surname: "Doe",
    room_number: "A101",
    building: "North Tower",
    location: "Main Campus",
    gender: "Male",
    avatar_url: "",
  },
  {
    id: "u2",
    student_id: "ST12346",
    email: "jane.smith@example.com",
    first_name: "Jane",
    surname: "Smith",
    room_number: "B202",
    building: "South Tower",
    location: "Main Campus",
    gender: "Female",
    avatar_url: "",
  },
  {
    id: "u3",
    student_id: "ST12347",
    email: "michael.brown@example.com",
    first_name: "Michael",
    surname: "Brown",
    room_number: "C303",
    building: "East Tower",
    location: "Downtown Campus",
    gender: "Male",
    avatar_url: "",
  },
  {
    id: "u4",
    student_id: "ST12348",
    email: "sarah.johnson@example.com",
    first_name: "Sarah",
    surname: "Johnson",
    room_number: "D404",
    building: "West Tower",
    location: "Downtown Campus",
    gender: "Female",
    avatar_url: "",
  },
  {
    id: "u5",
    student_id: "ST12349",
    email: "david.wilson@example.com",
    first_name: "David",
    surname: "Wilson",
    room_number: "E505",
    building: "North Tower",
    location: "Main Campus",
    gender: "Male",
    avatar_url: "",
  },
]

const columns = [
  {
    accessorKey: "avatar_url",
    header: "",
    cell: ({ row }: any) => {
      const user = row.original
      const fullName = `${user.first_name} ${user.surname}`

      return (
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.avatar_url} alt={fullName} />
          <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "student_id",
    header: "Student ID",
  },
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
    accessorKey: "building",
    header: "Building",
  },
  {
    accessorKey: "room_number",
    header: "Room",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const user = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/users/${user.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

function UsersTableSkeleton() {
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
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-24 ml-4" />
              <Skeleton className="h-4 w-24 ml-4" />
              <Skeleton className="h-4 w-24 ml-4" />
              <Skeleton className="h-4 w-32 ml-4" />
              <Skeleton className="h-4 w-24 ml-4" />
              <Skeleton className="h-4 w-16 ml-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user profiles and information.</p>
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
          <Link href="/users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      <Suspense fallback={<UsersTableSkeleton />}>
        <DataTable columns={columns} data={mockUsers} searchKey="email" searchPlaceholder="Search by email..." />
      </Suspense>
    </div>
  )
}

