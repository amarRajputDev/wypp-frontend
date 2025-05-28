
import { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import ChatConversation from './ChatConversation'
import ChatEmptyState from './ChatEmptyState'
// import { useParams } from 'react-router-dom'
// import useGetRealTimeMsg from '../../hooks/useGetRealTimeMsg'

function Chat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  


  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(!selectedChat)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile, selectedChat])

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId)
    console.log(selectedChat)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  

  const handleBackToList = () => {
    setSelectedChat(null)
    if (isMobile) {
      setSidebarOpen(true)
    }
  }

  return (
    <div className="flex h-screen bg-base-100">
      <div
        className={`${
          sidebarOpen ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-80 border-r border-base-300 bg-base-200`}
      >
        <SideBar onChatSelect={handleChatSelect} selectedChatId={selectedChat} />
      </div>

      <div className={`${sidebarOpen && isMobile ? "hidden" : "flex"} flex-1 flex flex-col`}>
        {selectedChat ? (
          <ChatConversation key={selectedChat} chatId={selectedChat} onBack={handleBackToList} showBackButton={isMobile} />
        ) : (
          <ChatEmptyState />
        )}
      </div>
    </div>
  )
}

export default Chat
