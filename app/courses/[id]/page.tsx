"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, Clock, BookOpen, Award, CheckCircle, Star, Users, BarChart } from "lucide-react"
import VideoPlayer from "@/components/video-player"

export default function CoursePage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [currentLesson, setCurrentLesson] = useState(1)
  const [isEnrolled, setIsEnrolled] = useState(false)

  // Mock course data
  const course = {
    id: Number(id),
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development, including HTML, CSS, and JavaScript. This comprehensive course will take you from beginner to confident web developer through hands-on projects and exercises.",
    category: "Development",
    level: "Beginner",
    lessons: 12,
    duration: "4.5 hours",
    instructor: {
      name: "John Smith",
      bio: "Senior Web Developer with 10+ years of experience. John has worked with major tech companies and has taught over 50,000 students online.",
      image: "/placeholder.svg?height=100&width=100",
    },
    rating: 4.8,
    reviews: 245,
    students: 1245,
    image: "/placeholder.svg?height=400&width=800",
    price: "Free",
    lastUpdated: "April 2025",
    modules: [
      {
        id: 1,
        title: "Getting Started with Web Development",
        lessons: [
          { id: 1, title: "Introduction to the Course", duration: "10 min", isCompleted: true },
          { id: 2, title: "Setting Up Your Development Environment", duration: "15 min", isCompleted: true },
          { id: 3, title: "Understanding HTML Basics", duration: "20 min", isCompleted: false },
          { id: 4, title: "CSS Fundamentals", duration: "25 min", isCompleted: false },
        ],
      },
      {
        id: 2,
        title: "JavaScript Essentials",
        lessons: [
          { id: 5, title: "Introduction to JavaScript", duration: "15 min", isCompleted: false },
          { id: 6, title: "Variables and Data Types", duration: "20 min", isCompleted: false },
          { id: 7, title: "Functions and Control Flow", duration: "25 min", isCompleted: false },
          { id: 8, title: "DOM Manipulation", duration: "30 min", isCompleted: false },
        ],
      },
      {
        id: 3,
        title: "Building Your First Website",
        lessons: [
          { id: 9, title: "Project Planning", duration: "15 min", isCompleted: false },
          { id: 10, title: "Creating the HTML Structure", duration: "20 min", isCompleted: false },
          { id: 11, title: "Styling with CSS", duration: "25 min", isCompleted: false },
          { id: 12, title: "Adding Interactivity with JavaScript", duration: "30 min", isCompleted: false },
        ],
      },
    ],
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
  }

  const handleLessonClick = (lessonId: number) => {
    setCurrentLesson(lessonId)
  }

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.isCompleted).length,
    0,
  )
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  // Find current lesson details
  const currentLessonDetails = course.modules
    .flatMap((module) => module.lessons)
    .find((lesson) => lesson.id === currentLesson)

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        {/* Course Header */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Link href="/courses" className="text-sm text-blue-600 hover:underline">
                ← Back to Courses
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{course.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <span className="font-medium">{course.rating}</span>
                <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm text-muted-foreground">({course.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course.lessons} lessons</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src={course.instructor.image || "/placeholder.svg"}
                alt={course.instructor.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Instructor: {course.instructor.name}</p>
                <p className="text-xs text-muted-foreground">Last updated: {course.lastUpdated}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              {isEnrolled ? (
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="#current-lesson">Continue Learning</Link>
                </Button>
              ) : (
                <Button onClick={handleEnroll} className="bg-blue-600 hover:bg-blue-700">
                  Enroll Now - {course.price}
                </Button>
              )}
              <Button variant="outline">Add to Wishlist</Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" priority />
            {!isEnrolled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button
                  onClick={handleEnroll}
                  className="flex items-center space-x-2 rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                  <PlayCircle className="h-5 w-5" />
                  <span>Preview Course</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Course Content */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h2 className="text-xl font-bold">About This Course</h2>
                  <p className="mt-2 text-muted-foreground">{course.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold">What You'll Learn</h2>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {[
                      "HTML5 structure and semantics",
                      "CSS styling and layouts",
                      "JavaScript fundamentals",
                      "DOM manipulation",
                      "Responsive web design",
                      "Web development best practices",
                      "Building complete web projects",
                      "Debugging and problem solving",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold">Requirements</h2>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Basic computer skills</li>
                    <li>No prior programming experience required</li>
                    <li>A computer with internet access</li>
                    <li>Enthusiasm to learn web development</li>
                  </ul>
                </div>
              </div>

              <div>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <h3 className="text-lg font-bold">This Course Includes</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <PlayCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>{course.duration} of video content</span>
                      </li>
                      <li className="flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>{course.lessons} lessons</span>
                      </li>
                      <li className="flex items-center">
                        <BarChart className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>5 quizzes</span>
                      </li>
                      <li className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                    <div className="pt-2">
                      <h4 className="text-sm font-medium">Course Progress</h4>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>
                            {completedLessons} of {totalLessons} lessons completed
                          </span>
                          <span>{progressPercentage}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold">Course Content</h2>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {course.modules.length} modules • {course.lessons} lessons • {course.duration} total
                  </p>
                  <Button variant="link" className="p-0 h-auto">
                    Expand All
                  </Button>
                </div>

                <Accordion type="single" collapsible className="mt-4">
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={`module-${module.id}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-1 items-center justify-between pr-4">
                          <span>{module.title}</span>
                          <span className="text-sm text-muted-foreground">{module.lessons.length} lessons</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 p-1">
                          {module.lessons.map((lesson) => (
                            <li key={lesson.id}>
                              <button
                                onClick={() => handleLessonClick(lesson.id)}
                                className={`flex w-full items-center justify-between rounded-md p-2 text-left text-sm transition-colors ${
                                  currentLesson === lesson.id ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                }`}
                              >
                                <div className="flex items-center">
                                  {lesson.isCompleted ? (
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                  ) : (
                                    <PlayCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {isEnrolled && (
                <div id="current-lesson">
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <h3 className="text-lg font-bold">Current Lesson</h3>
                      <div className="space-y-2">
                        <h4 className="font-medium">{currentLessonDetails?.title}</h4>
                        <p className="text-sm text-muted-foreground">Duration: {currentLessonDetails?.duration}</p>
                      </div>
                      <div className="aspect-video overflow-hidden rounded-md bg-gray-100">
                        <VideoPlayer />
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" disabled={currentLesson === 1}>
                          Previous Lesson
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentLesson === course.modules.flatMap((m) => m.lessons).length}
                        >
                          Next Lesson
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="instructor" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <Image
                  src={course.instructor.image || "/placeholder.svg"}
                  alt={course.instructor.name}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-3/4 space-y-4">
                <h2 className="text-xl font-bold">{course.instructor.name}</h2>
                <p className="text-muted-foreground">{course.instructor.bio}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">50+</span>
                    <span className="text-sm text-muted-foreground">Courses</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">50,000+</span>
                    <span className="text-sm text-muted-foreground">Students</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">4.8</span>
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                  </div>
                </div>
                <Button variant="outline">View All Courses by This Instructor</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold">Student Reviews</h2>

                {/* Sample reviews */}
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={`/placeholder.svg?height=40&width=40`}
                          alt="Reviewer"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="ml-2">
                          <p className="font-medium">Student Name</p>
                          <p className="text-xs text-muted-foreground">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">5.0</span>
                        <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      This course was exactly what I needed to get started with web development. The instructor explains
                      concepts clearly and the projects helped reinforce what I learned.
                    </p>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>

              <div>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <h3 className="text-lg font-bold">Rating Breakdown</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <div className="flex items-center w-16">
                            <span>{rating}</span>
                            <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                          <div className="flex-1 mx-2">
                            <Progress
                              value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : 0}
                              className="h-2"
                            />
                          </div>
                          <div className="w-10 text-right text-sm text-muted-foreground">
                            {rating === 5 ? "75%" : rating === 4 ? "20%" : rating === 3 ? "5%" : "0%"}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Average Rating</span>
                        <div className="flex items-center">
                          <span className="font-medium">{course.rating}</span>
                          <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Based on {course.reviews} reviews</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
