// import { formatDistanceToNow } from "date-fns"

interface Announcement {
  id: number
  title: string
  date: string
  content: string
  author: string
  role: string
  important: boolean
}

interface AnnouncementCardProps {
  announcement: Announcement
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
//   const formattedDate = formatDistanceToNow(new Date(announcement.date), { addSuffix: true })
  const formattedDate = new Date(announcement.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });


  return (
    <div className={`card bg-base-100 shadow-xl ${announcement.important ? "border-l-4 border-error" : ""}`}>
      <div className="card-body">
        <div className="flex items-start justify-between">
          <h2 className="card-title">
            {announcement.title}
            {announcement.important && <div className="badge badge-error">Important</div>}
          </h2>
          <div className="text-sm opacity-70">{formattedDate}</div>
        </div>

        <p className="mt-4">{announcement.content}</p>

        <div className="card-actions mt-4 justify-end">
          <div className="flex flex-col items-end">
            <span className="font-medium">{announcement.author}</span>
            <span className="text-sm opacity-70">{announcement.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

