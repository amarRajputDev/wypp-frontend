import {Link} from "react-router-dom"
import { Users, BookOpen, Share2, Shield } from "lucide-react"
import NavBarLanding from "../components/NavBarLanding"

export default function About() {
  //TODO:Add a Photo in ceo block
  return (
    <>
    <NavBarLanding/>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connecting Students, Building Communities
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Wypp is a social networking platform designed exclusively for college students, making campus life more
              connected, collaborative, and exciting.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At Wypp, we believe that the college experience goes beyond the classroom. Our mission is to create a
              digital space where students can connect, collaborate, and create meaningful relationships that enhance
              their academic journey.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2024 by Amar Lodhi, Wypp has grown from a simple idea into a thriving community that connects
              thousands of students across multiple campuses.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Makes Wypp Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student-First</h3>
              <p className="text-gray-600">
                Built specifically for college students, with features that matter to your academic life.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BookOpen className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Groups</h3>
              <p className="text-gray-600">Form study groups, share resources, and collaborate on projects easily.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Share2 className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Sharing</h3>
              <p className="text-gray-600">Discover and share campus events, club meetings, and social gatherings.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe Space</h3>
              <p className="text-gray-600">Verified college emails only, ensuring a secure and trusted community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">50K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">100+</div>
              <div className="text-gray-600">Connected Campuses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">1M+</div>
              <div className="text-gray-600">Monthly Interactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Founder</h2>
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Amar Lodhi - Founder & CEO of Wypp"
                className="rounded-full mx-auto w-[200px] h-[200px] object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Amar Lodhi</h3>
            <p className="text-gray-600 mb-4">Founder & CEO</p>
            <p className="text-gray-600 mb-6">
              A passionate developer and entrepreneur committed to improving the college experience through technology
              and community building.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="https://twitter.com/amarlodhi"
                className="text-blue-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
              <Link
                to="https://linkedin.com/in/amarlodhi"
                className="text-blue-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Join the Community?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with fellow students, share experiences, and make the most of your college life.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Join Wypp Today
          </Link>
        </div>
      </section>
    </div>
    </>
  )
}

