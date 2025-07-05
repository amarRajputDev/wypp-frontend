import { createHashRouter, RouterProvider, } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage/HomePage'
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import { ToastContainer, Zoom } from 'react-toastify';
import { useEffect } from 'react';
// import axios from 'axios';
import useUserStore from './store/authStore';
import ProfilePage from './pages/Profile/ProfilePage';
import ChatPage from './pages/chat/Chat';
import io from "socket.io-client"
import useSocketStore from './store/socketStore';
import OthersProfile from './components/OthersProfile';
import ChatById from './pages/chatById/ChatById';
import ProtectedRoute from './components/ProtectedRoute';
import FriendsPage from './pages/friends/FriendsPage';
import NavbarHome from './components/NavbarHome';
import MobileNav from './components/MobileNav';
import Announcement from './pages/announcement/Announcement';

// import LendingPage from './pages/homePage/LendingPage'

const router = createHashRouter([
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: (
  <ProtectedRoute>
    <NavbarHome/>
    <MobileNav/>
    <Home />
    
  </ProtectedRoute>
) },
  { path: "/home/profile", element:(
    <ProtectedRoute>
        <ProfilePage />
    </ProtectedRoute>
  )  },
  { path: "/home/wypespace", element: 
  (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  )
   },
  { path: "/home/announcement", element:
    (
      <ProtectedRoute>

        <Announcement />
      </ProtectedRoute>
    )

   },
  { path: "/home/secretthoughts", element: 
  (
    <ProtectedRoute>
    <MobileNav/>

      
      <Home />
    </ProtectedRoute>
  )

   },
  { path: "/home/chat", element:
    (
      <ProtectedRoute>
        <NavbarHome/>



        <ChatPage /> 
      </ProtectedRoute>
    )

  },
  { path: "/home/chat/:receiverId", element:
    <ProtectedRoute>

      <ChatById />
    </ProtectedRoute>
     },
  { path: "/user/:id", element:
    (
      <ProtectedRoute>
        <OthersProfile />
      </ProtectedRoute>
    )
     },
     { path: "/Friends", element:
      (
        <ProtectedRoute>
          <NavbarHome/>
    <MobileNav/>

          <FriendsPage />
        </ProtectedRoute>
      )
       },
]);

function App() {

  // const navigate = useNavigate()

  const {userData,setOnlineUsers } = useUserStore()
  // const [socket, setsocket] = useState<Socket | null>(null)
  const {setSocket , Socket} = useSocketStore()
  
  // const apiUrl = import.meta.env.VITE_API_URL
  // const fetchUser = async () => {
  //   try {
  //     const res = await axios.get(`${apiUrl}/user/getuser`, { withCredentials: true });
  //     // console.log(res.data);
  //     setUser(res.data.userData)
  //     // navigate("/home")

  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchUser();
  // },[])

  useEffect(() => {
    if (userData) {
      // console.log("Connecting to WebSocket...");
      const newSocket = io("https://wypp-backend.onrender.com", {
        withCredentials: true, // Ensure cookies are sent if required
        transports: ["websocket"], // Use WebSockets explicitly
        query:{
          userId : userData._id
        }
      });

      setSocket(newSocket);

      newSocket.on('getOnlineUsers' , (onlineUsers) => {
        setOnlineUsers(onlineUsers)
      })

      // Cleanup function to avoid multiple connections
      return () => {
        // console.log("Disconnecting WebSocket...");
        newSocket.disconnect();
      };
    }else{
      if (Socket) {
        Socket.close()
        setSocket(null)
      }
    }
  }, [userData]);
  


  
  return (
    <>
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Zoom}
    />
    <RouterProvider router={router} />
    </>
  )
 
}


export default App
