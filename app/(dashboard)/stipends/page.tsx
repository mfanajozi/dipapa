'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

// Mock data for stipends
const mockStipends = [
  {
    id: "s1",
    student_id: "ST12345",
    amount: 1000,
    status: "Approved",
  },
  {
    id: "s2",
    student_id: "ST12346",
    amount: 1500,
    status: "Pending",
  },
  {
    id: "s3",
    student_id: "ST12347",
    amount: 1200,
    status: "Approved",
  },
  {
    id: "s4",
    student_id: "ST12348",
    amount: 800,
    status: "Rejected",
  },
  {
    id: "s5",
    student_id: "ST12349",
    amount: 2000,
    status: "Approved",
  },
]

const columns = [
  {
    accessorKey: "student_id",
    header: "Student ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const stipend = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/stipend/${stipend.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

export default function StipendPage() {
  const [stipends, setStipends] = useState([]);

  useEffect(() => {
    const fetchStipends = async () => {
      const response = await fetch('/api/stipends'); // Adjust the API endpoint as necessary
      const data = await response.json();
      setStipends(data);
    };

    fetchStipends();
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Stipend</h1>
        <p className="text-muted-foreground">Manage stipend records.</p>
      </div>
      <DataTable columns={columns} data={stipends} searchKey="student_id" searchPlaceholder="Search by student ID..." />
    </div>
  )
}
