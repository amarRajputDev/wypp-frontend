"use client"

import { useState } from "react"
import AnnouncementCard from "./AnnouncementCard"

// Sample announcement data
const announcementData = [
  {
    id: 1,
    title: "Fall Semester Registration Now Open",
    date: "2025-03-25",
    content:
      "Registration for the Fall 2025 semester is now open. All students are required to register by April 15th. Please log in to the student portal to select your courses.",
    author: "Dr. Jane Smith",
    role: "Dean of Admissions",
    important: true,
  },
  {
    id: 2,
    title: "Campus Maintenance Schedule",
    date: "2025-03-22",
    content:
      "The main library will be closed for renovations from March 30th to April 5th. Alternative study spaces will be available in the Student Union building.",
    author: "Michael Johnson",
    role: "Facilities Manager",
    important: false,
  },
  {
    id: 3,
    title: "New Research Grant Opportunities",
    date: "2025-03-20",
    content:
      "The Office of Research is pleased to announce new grant opportunities for faculty and graduate students. Applications are due by May 1st. Information sessions will be held next week.",
    author: "Dr. Robert Chen",
    role: "Vice President of Research",
    important: true,
  },
  {
    id: 4,
    title: "Changes to Parking Regulations",
    date: "2025-03-18",
    content:
      "Starting April 1st, new parking regulations will be in effect. All vehicles must display the updated parking permit. Visit the Transportation Office to obtain your new permit.",
    author: "Campus Security",
    role: "Administration",
    important: false,
  },
  {
    id: 5,
    title: "Upcoming Guest Lecture Series",
    date: "2025-03-15",
    content:
      "We are excited to announce our Spring Guest Lecture Series featuring renowned speakers from various fields. The first lecture will be held on April 10th in the Main Auditorium.",
    author: "Dr. Emily Williams",
    role: "Academic Affairs Director",
    important: false,
  },
]

export default function AnnouncementList() {
  const [filter, setFilter] = useState("all")

  const filteredAnnouncements =
    filter === "important" ? announcementData.filter((announcement) => announcement.important) : announcementData

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="btn-group">
          <button className={`btn ${filter === "all" ? "btn-active" : ""}`} onClick={() => setFilter("all")}>
            All
          </button>
          <button
            className={`btn ${filter === "important" ? "btn-active" : ""}`}
            onClick={() => setFilter("important")}
          >
            Important
          </button>
        </div>
      </div>

      {filteredAnnouncements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}

      {filteredAnnouncements.length === 0 && (
        <div className="alert">
          <div>
            <span>No announcements found.</span>
          </div>
        </div>
      )}
    </div>
  )
}

