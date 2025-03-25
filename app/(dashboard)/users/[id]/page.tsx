import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Edit, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getInitials } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockUser = {
  id: "u1",
  student_id: "ST12345",
  email: "john.doe@example.com",
  first_name: "John",
  middle_name: "Robert",
  surname: "Doe",
  room_number: "A101",
  phone: "+27 71 234 5678",
  alt_phone: "+27 82 345 6789",
  move_in_date: "2023-01-15",
  location: "Main Campus",
  building: "North Tower",
  id_number: "9001015012087",
  start_date: "2023-01-10",
  date_of_birth: "1990-01-01",
  gender: "Male",
  race: "White",
  home_address: "123 Main Street, Pretoria",
  province: "Gauteng",
  municipality: "City of Tshwane",
  locality: "Pretoria Central",
  citizenship: "South African",
  disability: "None",
  employment_status: "Student",
  sassa_grant: "No",
  highest_education: "High School",
  education_mark: "75%",
  year_completed: "2022",
  institution: "Pretoria High School",
  program: "Computer Science",
  trade: "Software Development",
  bio: "John is a first-year computer science student with a passion for software development.",
  avatar_url: "",
}

// Mock activity logs
const mockActivityLogs = [
  {
    id: "a1",
    action: "Password Reset",
    user_email: "support@dipapa.com",
    details: "Password reset for user",
    timestamp: "2023-03-15T10:30:00Z",
  },
  {
    id: "a2",
    action: "Profile Update",
    user_email: "admin@dipapa.com",
    details: "Updated contact information",
    timestamp: "2023-02-20T14:45:00Z",
  },
  {
    id: "a3",
    action: "Room Change",
    user_email: "support@dipapa.com",
    details: "Changed room from A100 to A101",
    timestamp: "2023-01-25T09:15:00Z",
  },
]

export default function UserDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the user data based on the ID
  const user = mockUser
  const fullName = `${user.first_name} ${user.middle_name ? user.middle_name + " " : ""}${user.surname}`

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/users">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to users</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>User Information</CardTitle>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit user</span>
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar_url} alt={fullName} />
                <AvatarFallback className="text-xl">{getInitials(fullName)}</AvatarFallback>
              </Avatar>
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Student ID</p>
                    <p className="font-medium">{user.student_id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ID Number</p>
                    <p className="font-medium">{user.id_number}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Building</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{user.building}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Room</p>
                    <p className="font-medium">{user.room_number}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Recent activities related to this user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivityLogs.map((log) => (
                <div key={log.id} className="flex flex-col space-y-1 border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                  <p className="text-xs text-muted-foreground">By: {log.user_email}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="animate-in">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{new Date(user.date_of_birth).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.gender}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Race</p>
                  <p className="font-medium">{user.race}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Citizenship</p>
                  <p className="font-medium">{user.citizenship}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Home Address</p>
                  <p className="font-medium">{user.home_address}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Province</p>
                  <p className="font-medium">{user.province}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Municipality</p>
                  <p className="font-medium">{user.municipality}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Locality</p>
                  <p className="font-medium">{user.locality}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Disability</p>
                  <p className="font-medium">{user.disability}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Employment Status</p>
                  <p className="font-medium">{user.employment_status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">SASSA Grant</p>
                  <p className="font-medium">{user.sassa_grant}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Alternative Phone</p>
                  <p className="font-medium">{user.alt_phone || "Not provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="education" className="animate-in">
          <Card>
            <CardHeader>
              <CardTitle>Education Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Highest Education</p>
                  <p className="font-medium">{user.highest_education}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Education Mark</p>
                  <p className="font-medium">{user.education_mark}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Year Completed</p>
                  <p className="font-medium">{user.year_completed}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Institution</p>
                  <p className="font-medium">{user.institution}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Program</p>
                  <p className="font-medium">{user.program}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Trade</p>
                  <p className="font-medium">{user.trade}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="accommodation" className="animate-in">
          <Card>
            <CardHeader>
              <CardTitle>Accommodation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{user.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Building</p>
                  <p className="font-medium">{user.building}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Room Number</p>
                  <p className="font-medium">{user.room_number}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Move-in Date</p>
                  <p className="font-medium">{new Date(user.move_in_date).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{new Date(user.start_date).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/users">Cancel</Link>
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete User
        </Button>
      </div>
    </div>
  )
}

