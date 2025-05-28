import { useState, useEffect, useRef } from "react";
import {
  Music,
  Code,
  Camera,
  Coffee,
  Gamepad2,
  Moon,
  Sun,
  Sparkles,
  GraduationCap,
  Heart,
  Users,
  ImageIcon,
  Calendar,
  CircleAlert,
} from "lucide-react";
// import useUserStore from "../store/authStore"
import axios from "axios";
// import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../store/authStore";
import { toast } from "react-toastify";

export default function OthersProfile() {
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(75);
  const [mounted, setMounted] = useState(false);
  const [hoveredInterest, setHoveredInterest] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("photos");
  const [posts, setPosts] = useState([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isRequestLoading, setisRequestLoading] = useState(false);
  const [isRequestSent, setisRequestSent] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");

  const { onlineUsers } = useUserStore();
  const { id } = useParams();
  const isOnline = onlineUsers?.includes(id!);

  // Personality type interaction
  const [personalityIndex, setPersonalityIndex] = useState(0);
  const [userData, setuserData] = useState<any>();
  const personalityTypes = [
    { type: "Ambivert", emoji: "🦋", color: "from-purple-500 to-blue-500" },
    { type: "Introvert", emoji: "🌙", color: "from-blue-500 to-indigo-500" },
    { type: "Extrovert", emoji: "☀️", color: "from-yellow-500 to-orange-500" },
  ];

  const interests = [
    {
      name: "Music",
      icon: <Music className="h-4 w-4" />,
      color: "from-lavender-500 to-purple-400",
    },
    {
      name: "Coding",
      icon: <Code className="h-4 w-4" />,
      color: "from-cyber-blue to-blue-400",
    },
    {
      name: "Photography",
      icon: <Camera className="h-4 w-4" />,
      color: "from-peach-400 to-orange-300",
    },
    {
      name: "Coffee",
      icon: <Coffee className="h-4 w-4" />,
      color: "from-amber-300 to-amber-400",
    },
    {
      name: "Gaming",
      icon: <Gamepad2 className="h-4 w-4" />,
      color: "from-mint-green to-green-300",
    },
  ];

  const { userData: myData } = useUserStore();

  useEffect(() => {
    // console.log("id ---->", id);
    const posts = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/otherUser/${id}`,
        { withCredentials: true }
      );

      // console.log("response --->", response.data.user);
      setuserData(response.data.user);
      //   setPosts(response.data.posts)
    };

    posts();
  }, []);

  useEffect(() => {
    setMounted(true);

    // Simulate progress bar loading
    const timer = setTimeout(() => {
      setProgress(75);
    }, 500);

    // Set initial dark mode based on user preference
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  //CheckRequests
  useEffect(() => {
    const checkRequest = async () => {
      if (!myData?._id || !userData?._id) return; // Avoid API call if IDs are missing

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/friends/status/${myData._id}/${userData._id}`
        );
        console.log("Friend request status:", res.data);
        setRequestStatus(res.data.status);
      } catch (error) {
        console.error("Error checking friend request:", error);
      }
    };

    checkRequest();
  }, [myData?._id, userData?._id]);

  //Get AllPosts Of User By Id
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/uploads/getPostsbyId/${id}`
      );

      if (res.status === 200) {
        // console.log(res.data.posts)
        setPosts(res.data.posts);
      }
    };

    fetchPosts();
  }, []);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Pulse animation for counters
  const [pulseCount, setPulseCount] = useState(false);
  const [pulsePosts, setPulsePosts] = useState(false);

  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulseCount(true);
      setTimeout(() => setPulseCount(false), 1000);

      setTimeout(() => {
        setPulsePosts(true);
        setTimeout(() => setPulsePosts(false), 1000);
      }, 1500);
    }, 5000);

    return () => clearInterval(pulseTimer);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Calculate parallax transform values
  const getParallaxStyle = (depth = 1) => {
    const moveX = (mousePosition.x - 0.5) * depth * 20;
    const moveY = (mousePosition.y - 0.5) * depth * 20;
    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
      transition: "transform 0.1s ease-out",
    };
  };

  //   handle frined request
  const handleRequest = async () => {
    setisRequestLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/friends/send`,
        { senderId: myData?._id, receiverId: userData._id },
        { withCredentials: true }
      );
      console.log("response -->", res);
      toast.success(res.data.message);

      if (res.status === 201) {
        setisRequestSent(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisRequestLoading(false);
    }
  };
  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-zinc-900 via-purple-950 to-zinc-900 text-white"
          : "bg-gradient-to-br from-lavender-50 via-cyber-blue-50 to-mint-green-50 text-zinc-800"
      } p-4 md:p-8`}
    >
      {/* <Setting/> */}

      {/* Dark/Light Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center space-x-2">
          <Moon
            className={`h-4 w-4 ${
              isDarkMode ? "text-purple-400" : "text-zinc-400"
            }`}
          />

          {/* Custom toggle switch */}
          <div
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${
              isDarkMode ? "bg-zinc-700" : "bg-lavender-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                !isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>

          <Sun
            className={`h-4 w-4 ${
              isDarkMode ? "text-zinc-400" : "text-amber-400"
            }`}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header with blob background */}
        <div className="relative mb-16 mt-10">
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ${
              isDarkMode
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-cyber-blue opacity-20"
                : "bg-gradient-to-r from-peach-300 via-lavender-300 to-mint-green-300 opacity-30"
            } blur-3xl`}
            style={getParallaxStyle(0.5)}
          ></div>

          {/* Profile picture container with blob shape */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={getParallaxStyle(0.2)}
            >
              {/* Animated neon glow */}
              <div
                className={`absolute inset-0 rounded-full ${
                  isDarkMode
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-cyber-blue"
                    : "bg-gradient-to-r from-peach-300 via-lavender-300 to-mint-green-300"
                } blur-md transition-all duration-500 ${
                  isHovering ? "scale-110 opacity-80" : "scale-100 opacity-60"
                }`}
              ></div>

              {/* Blob shape with clip-path */}
              <div
                className={`relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border-4 ${
                  isDarkMode ? "border-white/20" : "border-white/60"
                } shadow-xl`}
                style={{
                  clipPath: "url(#blob-shape)",
                  animation: "floating 3s ease-in-out infinite alternate",
                }}
              >
                <img
                  src={userData?.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* SVG for blob shape */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <clipPath id="blob-shape" clipPathUnits="objectBoundingBox">
                    <path d="M0.5,0.09 C0.73,0.09,1,0.26,1,0.5 C1,0.74,0.74,1,0.5,1 C0.26,1,0,0.73,0,0.5 C0,0.27,0.27,0.09,0.5,0.09 Z" />
                  </clipPath>
                </defs>
              </svg>

              {/* Online status indicator */}
              <div
                className={`absolute status-xl  status  ${
                  isOnline ? "animate-ping status-success" : ""
                }`}
              ></div>
              <div
                className={`absolute status-xl  status   ${
                  isOnline ? " status-success" : " hidden"
                } `}
              ></div>
            </div>

            {/* Name with glitch effect - mix of sans-serif and script font */}
            <h1
              className="mt-6 text-4xl md:text-5xl font-bold tracking-tight relative"
              style={getParallaxStyle(0.1)}
            >
              <span className="absolute inset-0 text-red-500 animate-pulse opacity-0 hover:opacity-30 transition-opacity duration-300">
                {userData?.fullName}
              </span>
              <span className="absolute inset-0 text-blue-500 animate-pulse opacity-0 hover:opacity-30 transition-opacity duration-300 translate-x-[2px] translate-y-[-2px]">
                {userData?.fullName}
              </span>
              <span
                className={`bg-clip-text text-transparent ${
                  isDarkMode
                    ? "bg-gradient-to-r from-pink-500 via-purple-400 to-cyber-blue"
                    : "bg-gradient-to-r from-peach-400 via-lavender-400 to-mint-green-400"
                } relative z-10`}
              >
                {userData?.fullName}
              </span>
            </h1>

            {/* Script font for "creative" */}
            <div
              className={`font-serif italic -mt-1 mb-1 text-lg ${
                isDarkMode ? "text-pink-300" : "text-peach-500"
              }`}
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              creative
            </div>

            {/* Username in monospace font */}
            <div
              className={`font-mono tracking-wide ${
                isDarkMode ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              @{userData?.username}
            </div>

            {/* Personality type badge with animation - clickable to change */}
            <div className="mt-4">
              <span
                onClick={() =>
                  setPersonalityIndex(
                    (prev) => (prev + 1) % personalityTypes.length
                  )
                }
                className={`inline-flex items-center bg-gradient-to-r ${personalityTypes[personalityIndex].color} rounded-full py-1.5 px-3 text-sm text-white transition-all duration-500 cursor-pointer hover:scale-105`}
              >
                <span className="mr-2 text-lg">
                  {personalityTypes[personalityIndex].emoji}
                </span>
                {userData?.personality}
              </span>

              {/* FRIEND REQUEST  */}

              {
                isRequestLoading ? (
                  // Loading state
                  <span
                    className={`inline-flex ml-4 items-center bg-gradient-to-r ${personalityTypes[personalityIndex].color} rounded-full py-1.5 px-3 text-sm text-white transition-all duration-500 cursor-pointer hover:scale-105`}
                  >
                    <span className="mr-2 text-lg loading loading-dots"></span>
                  </span>
                ) : requestStatus === "pending" || isRequestSent ? (
                  // Request Sent (Pending)
                  <span
                    className={`inline-flex ml-4 items-center bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full py-1.5 px-3 text-sm text-white transition-all duration-500 cursor-not-allowed`}
                  >
                    <span className="mr-2 text-lg">⏳ Request Sent</span>
                  </span>
                ) : requestStatus === "accepted" ? (
                  // Friends (Accepted)
                  <span
                    className={`inline-flex ml-4 items-center bg-gradient-to-r from-green-500 to-green-400 rounded-full py-1.5 px-3 text-sm text-white transition-all duration-500 cursor-not-allowed`}
                  >
                    <span className="mr-2 text-lg">✅ Friends</span>
                  </span>
                ) : requestStatus === "rejected" || requestStatus === "none" ? (
                  // Send Friend Request (Rejected or No Request Sent)
                  <span
                    onClick={handleRequest}
                    className={`inline-flex ml-4 items-center bg-gradient-to-r ${personalityTypes[personalityIndex].color} rounded-full py-1.5 px-3 text-sm text-white transition-all duration-500 cursor-pointer hover:scale-105`}
                  >
                    <span className="mr-2 text-lg">👋 Send Request</span>
                  </span>
                ) : null // Fallback for unknown statuses
              }




              {/* Send Message  */}
              <div
                onClick={()=>{navigate(`/home/chat/${userData._id}`)}}
                className={`inline-flex ml-4 items-center bg-gradient-to-r ${personalityTypes[personalityIndex].color} rounded-full py-1 px-1  text-sm text-white transition-all duration-500 cursor-pointer hover:scale-105`}
              >
                <div className=" px-2 size-full bg-[#43116E] rounded-full">
                  <span className="mr-2 text-lg">🗨️</span>
                  Send Message
                </div>
              </div>
            </div>

            {/* Stats with pulse animation */}
            <div className="flex gap-8 mt-6 text-center">
              <div
                className={`transition-all duration-300 ${
                  pulseCount
                    ? "scale-110 text-pink-400 dark:text-pink-400"
                    : "scale-100"
                }`}
              >
                <div className="text-2xl font-bold">{userData?.friends.length}</div>
                <div
                  className={`text-xs ${
                    isDarkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Friends
                </div>
              </div>
              <div
                className={`h-10 w-px ${
                  isDarkMode ? "bg-zinc-700" : "bg-zinc-300"
                }`}
              ></div>
              <div
                className={`transition-all duration-300 ${
                  pulsePosts
                    ? "scale-110 text-cyber-blue dark:text-cyan-400"
                    : "scale-100"
                }`}
              >
                <div className="text-2xl font-bold">{posts.length}</div>
                <div
                  className={`text-xs ${
                    isDarkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Posts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio section with neon border */}
        <div
          className={`relative rounded-lg overflow-hidden mb-8 ${
            isDarkMode
              ? "bg-zinc-900/60 backdrop-blur-md"
              : "bg-white/70 backdrop-blur-md"
          }`}
          style={getParallaxStyle(0.05)}
        >
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-cyber-blue opacity-10"
                : "bg-gradient-to-r from-peach-300 via-lavender-300 to-mint-green-300 opacity-20"
            }`}
          ></div>

          {/* Neon border effect */}
          <div
            className={`absolute inset-0 border rounded-lg ${
              isDarkMode
                ? "border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                : "border-lavender-400/50 shadow-[0_0_15px_rgba(167,139,250,0.3)]"
            } animate-pulse`}
          ></div>

          <div className="relative p-6 z-10">
            <h2
              className={`text-lg font-semibold mb-3 flex items-center ${
                isDarkMode ? "text-white" : "text-zinc-800"
              }`}
            >
              <Sparkles
                className={`w-4 h-4 mr-2 ${
                  isDarkMode ? "text-purple-400" : "text-lavender-500"
                }`}
              />
              About Me
            </h2>
            <p className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}>
              Digital creator exploring the intersection of art and technology.
              Always chasing the next big idea and turning dreams into pixels.
              ✨ Living life one creative project at a time.
            </p>
          </div>
        </div>

        {/* College & Course info with glassmorphism */}
        <div
          className={`relative rounded-lg overflow-hidden mb-8 shadow-lg ${
            isDarkMode
              ? "bg-white/5 backdrop-blur-lg border border-white/10"
              : "bg-white/60 backdrop-blur-lg border border-white/50"
          }`}
          style={getParallaxStyle(0.08)}
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div
                className={`${
                  isDarkMode
                    ? "bg-gradient-to-br from-purple-500 to-pink-500"
                    : "bg-gradient-to-br from-lavender-400 to-peach-300"
                } p-3 rounded-lg`}
              >
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    isDarkMode ? "text-white" : "text-zinc-800"
                  }`}
                >
                  {userData?.collegeName}
                </h3>
                <p
                  className={`mb-3 ${
                    isDarkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {userData?.courseName}
                </p>

                {/* Year of study as progress bar */}
                <div className="space-y-2">
                  <div
                    className={`flex justify-between text-sm ${
                      isDarkMode ? "text-white" : "text-zinc-800"
                    }`}
                  >
                    <span>Year of Study: {userData?.yearOfStudy}</span>
                    <span>{progress}%</span>
                  </div>

                  {/* Custom progress bar */}
                  <div
                    className={`h-2 w-full rounded-full overflow-hidden ${
                      isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                    }`}
                  >
                    <div
                      className={`h-full ${
                        isDarkMode
                          ? "bg-gradient-to-r from-pink-500 to-purple-500"
                          : "bg-gradient-to-r from-peach-300 to-lavender-400"
                      } rounded-full transition-all duration-1000 ease-in-out`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {/* Timeline markers */}
                  <div
                    className={`flex justify-between text-xs ${
                      isDarkMode ? "text-zinc-500" : "text-zinc-500"
                    } px-1`}
                  >
                    <span>1st Year</span>
                    <span>2nd Year</span>
                    <span>3rd Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interests as dynamic bubbles */}
        <div className="mb-8" style={getParallaxStyle(0.1)}>
          <h3
            className={`text-lg font-semibold mb-4 flex items-center ${
              isDarkMode ? "text-white" : "text-zinc-800"
            }`}
          >
            <Sparkles
              className={`w-4 h-4 mr-2 ${
                isDarkMode ? "text-purple-400" : "text-lavender-500"
              }`}
            />
            Interests
          </h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, index) => (
              <div
                key={index}
                className={`relative transition-all duration-300 ease-in-out ${
                  hoveredInterest === index ? "scale-110 z-10" : "scale-100 z-0"
                }`}
                onMouseEnter={() => setHoveredInterest(index)}
                onMouseLeave={() => setHoveredInterest(null)}
              >
                <span
                  className={`inline-flex items-center bg-gradient-to-r ${interest.color} rounded-full py-2 px-3 text-sm text-white cursor-pointer`}
                >
                  <span className="mr-2">{interest.icon}</span>
                  {interest.name}
                </span>
                {hoveredInterest === index && (
                  <div
                    className={`absolute -bottom-10 left-1/2 -translate-x-1/2 ${
                      isDarkMode
                        ? "bg-zinc-800 text-white"
                        : "bg-white text-zinc-800 border border-zinc-200"
                    } text-xs py-1 px-2 rounded whitespace-nowrap`}
                  >
                    {index === 0
                      ? "Indie & Alternative"
                      : index === 1
                      ? "React & Three.js"
                      : index === 2
                      ? "Street Photography"
                      : index === 3
                      ? "Espresso Lover"
                      : "RPG & Indie Games"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Best Friend & Special One section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Best Friend Card */}
          <div
            className={`rounded-lg overflow-hidden group relative ${
              isDarkMode
                ? "bg-zinc-900/60 backdrop-blur-md border border-zinc-800"
                : "bg-white/70 backdrop-blur-md border border-white/50"
            }`}
            style={getParallaxStyle(0.15)}
          >
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                  : "bg-gradient-to-r from-cyber-blue/10 to-lavender-300/10"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
            <div className="p-4 relative">
              <h3
                className={`text-sm font-semibold mb-3 flex items-center ${
                  isDarkMode ? "text-white" : "text-zinc-800"
                }`}
              >
                <Users
                  className={`w-4 h-4 mr-2 ${
                    isDarkMode ? "text-blue-400" : "text-cyber-blue"
                  }`}
                />
                Best Friend
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden transform rotate-3 border-2 border-white/20 shadow-lg transition-transform group-hover:rotate-0 duration-300">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Best Friend"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-zinc-800"
                    }`}
                  >
                    Jamie Lee
                  </div>
                  <div
                    className={`text-xs ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    Friends since 2018
                  </div>
                  <div className="flex items-center mt-1">
                    <Calendar
                      className={`w-3 h-3 mr-1 ${
                        isDarkMode ? "text-zinc-500" : "text-zinc-400"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      5 years of friendship
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special One Card */}
          <div
            className={`rounded-lg overflow-hidden group relative ${
              isDarkMode
                ? "bg-zinc-900/60 backdrop-blur-md border border-zinc-800"
                : "bg-white/70 backdrop-blur-md border border-white/50"
            }`}
            style={getParallaxStyle(0.15)}
          >
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-r from-pink-500/20 to-red-500/20"
                  : "bg-gradient-to-r from-peach-300/10 to-pink-300/10"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
            <div className="p-4 relative">
              <h3
                className={`text-sm font-semibold mb-3 flex items-center ${
                  isDarkMode ? "text-white" : "text-zinc-800"
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isDarkMode ? "text-pink-400" : "text-peach-400"
                  }`}
                />
                Special One
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden transform -rotate-3 border-2 border-white/20 shadow-lg transition-transform group-hover:rotate-0 duration-300">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Special One"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-zinc-800"
                    }`}
                  >
                    Taylor Reed
                  </div>
                  <div
                    className={`text-xs ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    Together since 2022
                  </div>
                  <div className="flex items-center mt-1">
                    <Calendar
                      className={`w-3 h-3 mr-1 ${
                        isDarkMode ? "text-zinc-500" : "text-zinc-400"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      2 years together
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tabs implementation */}
        <div className="w-full">
          {/* Tab header */}
          <div
            className={`w-full rounded-lg h-14 flex ${
              isDarkMode
                ? "bg-zinc-900/60 backdrop-blur-md border border-zinc-800"
                : "bg-white/70 backdrop-blur-md border border-zinc-200"
            }`}
          >
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center justify-center flex-1 rounded-lg transition-colors duration-300 ${
                activeTab === "photos"
                  ? isDarkMode
                    ? "bg-zinc-800 text-white"
                    : "bg-lavender-100 text-zinc-800"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Photos
            </button>
          </div>

          {/* Tab content */}
          <div className="mt-6">
            {activeTab === "photos" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mounted &&
                  posts.map((post: any, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden relative group"
                      style={getParallaxStyle(0.05 * ((i % 3) + 1))}
                    >
                      <img
                        src={post?.image}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <div className="flex gap-2">
                          <button className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 flex items-center justify-center">
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {!posts.length && (
            <div className=" flex w-full rounded-2xl bg-black/20 p-5 justify-center items-center gap-5">
              <CircleAlert size={30} />
              <h1 className=" text-2xl">No Photos</h1>
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
    </div>
  );
}
