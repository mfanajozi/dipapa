'use client'
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'
);

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('students').select('*');
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      accessorKey: "avatar_url",
      header: "",
      cell: function Cell({ row }: any) {
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
      id: "actions",
      cell: ({ row }: any) => {
        const user = row.original

        return (
          <div className="flex justify-end">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/users/${user.id}`}>View Details</Link>
            </Button>
          </div>
        )
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user profiles and information.</p>
      </div>

      <div className="flex justify-between">
        <Button asChild>
          <Link href="/users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={users} searchKey="email" searchPlaceholder="Search by email..." />
    </div>
  )
}
