import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, CheckCircle, PlayCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Learn Anything, Anytime, Anywhere
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Access high-quality video lessons, interactive quizzes, and track your progress with our
                student-friendly learning platform.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Students learning online"
                width={600}
                height={400}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Our Platform</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Everything you need to enhance your learning experience in one place.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-4">
                <PlayCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Video Lessons</h3>
              <p className="mt-2 text-gray-500">
                High-quality video content with expert instructors to guide your learning journey.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Interactive Quizzes</h3>
              <p className="mt-2 text-gray-500">
                Test your knowledge with interactive quizzes designed to reinforce learning.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="mt-2 text-gray-500">
                Monitor your progress and achievements with detailed analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Popular Courses</h2>
              <p className="mt-4 text-gray-500 md:text-xl/relaxed">
                Discover our most popular courses and start learning today.
              </p>
            </div>
            <Button asChild variant="ghost" className="mt-4 md:mt-0">
              <Link href="/courses" className="flex items-center">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((course) => (
              <Link
                key={course}
                href={`/courses/${course}`}
                className="group rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={`/placeholder.svg?height=200&width=400`}
                    alt={`Course ${course}`}
                    width={400}
                    height={200}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 text-sm font-medium text-blue-600">Category</div>
                  <h3 className="text-xl font-bold">Course Title {course}</h3>
                  <p className="mt-2 text-gray-500">
                    Learn the fundamentals and advanced techniques with our comprehensive course.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">12 lessons</div>
                      <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
                      <div className="text-sm">4.5 hours</div>
                    </div>
                    <div className="text-sm font-medium text-blue-600">Free</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="rounded-lg bg-blue-600 px-6 py-12 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Learning?</h2>
            <p className="mx-auto mt-4 max-w-[600px] text-blue-100 md:text-xl/relaxed">
              Join thousands of students who are already enhancing their skills on our platform.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
