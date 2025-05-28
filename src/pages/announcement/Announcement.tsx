// import Link from "next/link"
// import { Link } from "react-router-dom"
import AnnouncementList from "./AnnouncementList"
import useUserStore from "../../store/authStore"

export default function Announcement() {
   const {userData} = useUserStore()
  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-primary  text-primary-content shadow-lg">
        <div className="container mx-auto">
          <div className="flex-1  ">
            <h1 className=" text-center capitalize  text-xl abel-regular ">
              {userData?.collegeName}
            </h1>
          </div>
          {/* <div className="flex-none">
            <button className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div> */}
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Announcements</h1>
          <p className="mt-2 text-lg">Stay updated with the latest information from university administration</p>
        </div>

        <AnnouncementList />
      </main>

      <footer className="footer bg-neutral p-10 text-neutral-content">
        <div className="container mx-auto">
          <div>
            <span className="footer-title">University of Excellence</span>
            <p>Providing quality education since 1985</p>
            <p>© 2025 - All rights reserved</p>
          </div>
          <div>
            <span className="footer-title">Contact</span>
            <p>123 University Ave, Education City</p>
            <p>contact@universityofexcellence.edu</p>
            <p>(555) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

