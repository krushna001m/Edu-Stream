import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"

export default function CoursesPage() {
  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      category: "Development",
      level: "Beginner",
      lessons: 12,
      duration: "4.5 hours",
      instructor: "John Smith",
      rating: 4.8,
      students: 1245,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      category: "Development",
      level: "Advanced",
      lessons: 15,
      duration: "6 hours",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 987,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      level: "Beginner",
      lessons: 10,
      duration: "3.5 hours",
      instructor: "Michael Chen",
      rating: 4.7,
      students: 1532,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Data Science Essentials",
      category: "Data Science",
      level: "Intermediate",
      lessons: 14,
      duration: "5 hours",
      instructor: "Emily Rodriguez",
      rating: 4.6,
      students: 876,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      category: "Development",
      level: "Intermediate",
      lessons: 16,
      duration: "7 hours",
      instructor: "David Kim",
      rating: 4.8,
      students: 1089,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Digital Marketing Strategies",
      category: "Marketing",
      level: "Beginner",
      lessons: 8,
      duration: "3 hours",
      instructor: "Lisa Thompson",
      rating: 4.5,
      students: 1356,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Browse our collection of high-quality courses</p>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search courses..." className="w-full pl-8" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="data-science">Data Science</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">{course.category}</span>
                        <span className="text-sm text-muted-foreground">{course.level}</span>
                      </div>
                      <h3 className="line-clamp-2 text-xl font-bold">{course.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">{course.lessons} lessons</div>
                          <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
                          <div className="text-sm">{course.duration}</div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{course.rating}</span>
                          <span className="ml-1 text-yellow-500">★</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {course.students.toLocaleString()} students enrolled
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="development" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.category === "Development")
                .map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{course.category}</span>
                          <span className="text-sm text-muted-foreground">{course.level}</span>
                        </div>
                        <h3 className="line-clamp-2 text-xl font-bold">{course.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">{course.lessons} lessons</div>
                            <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
                            <div className="text-sm">{course.duration}</div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{course.rating}</span>
                            <span className="ml-1 text-yellow-500">★</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {course.students.toLocaleString()} students enrolled
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>

          {/* Similar TabsContent for other categories */}
          <TabsContent value="design" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.category === "Design")
                .map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      {/* Same card content structure as above */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{course.category}</span>
                          <span className="text-sm text-muted-foreground">{course.level}</span>
                        </div>
                        <h3 className="line-clamp-2 text-xl font-bold">{course.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">{course.lessons} lessons</div>
                            <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
                            <div className="text-sm">{course.duration}</div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{course.rating}</span>
                            <span className="ml-1 text-yellow-500">★</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {course.students.toLocaleString()} students enrolled
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
