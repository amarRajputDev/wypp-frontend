
import { useEffect, useState } from "react"
import { Search, UserPlus, Check, X, UserMinus } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
import { motion } from "motion/react"
import useUserStore from "../../store/authStore"
import { useNavigate } from "react-router-dom"



export default function FriendsList({incomingRe , outgoingRe} : any) {


  const [incomingReq, setIncomingReq] = useState(incomingRe);
  const [outgoingReq, setOutgoingReq] = useState(outgoingRe);
  const [friendsSuggestion, setFriendsSuggestion] = useState([])
  const [nosugg, setnosugg] = useState(1)
  const [friends, setFriends] = useState([]);
  const {userData } =useUserStore()
  

  // const [newRequest, setNewRequest] = useState("")

  useEffect(() => {
    setIncomingReq(incomingRe);
    setOutgoingReq(outgoingRe);
  }, [incomingRe, outgoingRe]);

//FETCH FRIENDS
  useEffect(() => {
    const fetchFriends = async() =>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/friends/getFriends/${userData?._id}`)
        // console.log(res.data.friends)
        setFriends(res.data.friends)
        
      } catch (error) {
        console.error("Error fetching friends:", error)
      }
    } 

    fetchFriends()
  }, [])


  //getUsersFromSameCollege

  useEffect(()=>{
    const getUsersFromSameCollege=async()=>{
      try {
        const res= await axios.get(`${import.meta.env.VITE_API_URL}/user/${userData?._id}/same-college?limit=${nosugg*5}`)
        console.log( "User Suggestion",res.data)
        setFriendsSuggestion(res.data.users)
  
      } catch (error) {
        console.log("Error in Fetching User Suggestions" , error)
        
      }
    }
    getUsersFromSameCollege()

  },[nosugg])

  const handleSendRequest = async(_id:string, seterase:any)=>{

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/friends/send` , {senderId:userData?._id , receiverId:_id})

      console.log(res.data)

      if (res.status === 201) {
        seterase(true)
        
        setTimeout(()=>{
    
          setFriendsSuggestion(prev => prev.filter((friend:any) => friend._id !== _id));

        },400)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(()=>{
  //   console.log( "suggestions",friendsSuggestion)
  // },[friendsSuggestion])


  
  
  
  
  

  const handleAcceptRequest = async(_id:string ) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/friends/accept/${_id}`)
    if (res.status === 200) {
      setIncomingReq((prev:any) => prev.filter((prev:any) => prev._id !== _id))
    }
    toast.success(res.data.message)
    
   
  }

  const handleRejectRequest = async(_id:string) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/friends/reject/${_id}`)

    toast.success(res.data.message)

    setOutgoingReq((prev:any)=>prev.filter((obj:any)=> obj._id !== _id))
  }



  //Handle this 👇👇👇👇👇

  const handleRemoveFriend = async (id:string) => {

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/friends/${userData?._id}/friends/${id}`)
      console.log(res.data)

      if (res.status === 200) {
        setFriends(prev => prev.filter((friend:any) => friend._id !== id))
        toast.info(res.data.message)
      }
    } catch (error) {
      console.log("something went wrong" , error)
    }

  }


  const removeMyRequest = async (friendId:string) =>{
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/friends/remove/${friendId}` , {withCredentials:true})
      console.log(res.data)
      if (res.status === 200) {
        setOutgoingReq((prev:any) => prev.filter((prev:any)=> prev._id !== friendId))
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Friends</h1>

 

      {/* Pending Requests */}
      <div className="card bg-base-100 shadow-xl mb-6 ">
        <div className="card-body ">
          <h2 className="card-title text-lg">Pending Requests</h2>

          {incomingReq.length === 0 ? (
            <p className="text-sm text-gray-500">No pending friend requests</p>
          ) : (
            <div className="divide-y ">
              {incomingReq.map((request:any) => (
                <FriendListItem key={request._id} removeMyRequest={removeMyRequest} handleAcceptRequest={handleAcceptRequest} handleRejectRequest={handleRejectRequest} request={request} type={"incoming"} />
              ))}


            </div>
          )}

<h2 className="card-title text-lg mt-3">Pending Sended Requests</h2>

{outgoingReq.length === 0 ? (
            <p className="text-sm text-gray-500">No pending friend requests</p>
          ) : (
            <div className="divide-y ">
              {outgoingReq.map((request:any) => (
                <FriendListItem key={request._id} removeMyRequest={removeMyRequest} handleAcceptRequest={handleAcceptRequest} handleRejectRequest={handleRejectRequest} request={request}  />
              ))}


            </div>
          )}

        </div>
      </div>

      {/* Friends List */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-lg">All Friends ({friends.length})</h2>
            <div className="form-control">
              <div className="input-group input-group-sm">
                <input type="text" placeholder="Search friends" className="input input-bordered input-sm" />
                <button className="btn btn-square btn-sm">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>

          {friends.length === 0 ? (
            <p className="text-sm text-gray-500">No friends yet</p>
          ) : (
            <div className="divide-y">
              {friends.map((friend:any) => (
                // <div key={friend._id} className="py-3  flex items-center justify-between">
                //   <div className="flex items-center gap-3">
                //     <div className="avatar online">
                //       <div className="w-10 rounded-full">
                //         <img src={friend.profilePic || "/placeholder.svg"} alt={friend.fullName} />
                //       </div>
                //     </div>
                //     <div>
                //       <p className="font-medium">{friend.fullName}</p>
                //       <div className="badge badge-sm badge-outline">
                //         {friend.status === "online" ? "Online" : "Offline"}
                //       </div>
                //     </div>
                //   </div>

                //   <div className="dropdown dropdown-end">
                //     <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
                //       <svg
                //         xmlns="http://www.w3.org/2000/svg"
                //         fill="none"
                //         viewBox="0 0 24 24"
                //         className="inline-block w-5 h-5 stroke-current"
                //       >
                //         <path
                //           strokeLinecap="round"
                //           strokeLinejoin="round"
                //           strokeWidth="2"
                //           d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                //         ></path>
                //       </svg>
                //     </label>
                //     <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                //       <li>
                //         <a>Send Message</a>
                //       </li>
                //       <li>
                //         <a>View Profile</a>
                //       </li>
                //       <li>
                //         <a className="text-error" onClick={() => handleRemoveFriend(friend.id)}>
                //           <UserMinus size={16} />
                //           Remove Friend
                //         </a>
                //       </li>
                //     </ul>
                //   </div>
                // </div>
                <Friend key={friend._id} handleRemoveFriend={handleRemoveFriend} friend={friend} />
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Friends Suggestion */}
      <div className="card bg-base-100 mt-4 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-lg">Friends Suggestion</h2>
            {/* <div className="form-control">
              <div className="input-group input-group-sm">
                <input type="text" placeholder="Search friends" className="input input-bordered input-sm" />
                <button className="btn btn-square btn-sm">
                  <Search size={16} />
                </button>
              </div>
            </div> */}
          </div>

          {friendsSuggestion.length === 0 ? (
            <p className="text-sm text-gray-500">No friends yet</p>
          ) : (
            <div className="divide-y">
              {friendsSuggestion.map((friend:any) => (
               
                <FriendSuggestionItem key={friend._id}  friend={friend} handleSendRequest={handleSendRequest} />
              ))}
              <h1 className=" link link-hover text-blue-600 mt-5" onClick={()=>{console.log(nosugg); setnosugg(prev => prev+1)}}>Load More...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}




function FriendListItem({ request, handleAcceptRequest, handleRejectRequest, removeMyRequest, type = "outgoing" }:any) {

  const [erase, seterase] = useState(false)

  return (
    <motion.div animate={{width: erase ? 0 : "auto"   , height:erase ? 0 : "auto" , scale : erase ? 0 : 1  }}>
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={ type === "incoming"? request.sender.profilePic : request.receiver.profilePic} alt={request.sender.username} />
            </div>
          </div>
          <div>
            <p className="font-medium">{type === "incoming"? request.sender.username : request.receiver.username}</p>
            <p className="text-xs text-gray-500">
              {type === "incoming" ? "Wants to add you" : "Request sent"}
            </p>
          </div>
        </div>

        {type === "incoming" ? (
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-success btn-circle"
              onClick={() => handleAcceptRequest(request._id)}
            >
              <Check size={16} />
            </button>
            <button
              className="btn btn-sm btn-error btn-circle"
              onClick={() => handleRejectRequest(request._id)}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button className="btn btn-sm btn-ghost btn-circle" onClick={() => {seterase(true); removeMyRequest(request.receiver._id)}}>
            <X size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}


function Friend({friend , handleRemoveFriend} : any){

  const {onlineUsers} =useUserStore()
  const isOnline = onlineUsers?.includes(friend._id)
  const navigate=useNavigate()
  

  return(
    <div key={friend._id} className="py-3  flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="avatar online">
                      <div className="w-10 rounded-full">
                        <img src={friend.profilePic || "/placeholder.svg"} alt={friend.fullName} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{friend.fullName}</p>
                      <div className="badge badge-sm badge-outline">
                        {isOnline ? "Online" : "Offline"}
                      </div>
                    </div>
                  </div>

                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                      </svg>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li
                      onClick={()=>navigate(`/home/chat/${friend._id}`)}
                      >
                        <a>Send Message</a>
                      </li>
                      <li
                      onClick={()=> navigate(`/user/${friend._id}`)}
                      >
                        <a>View Profile</a>
                      </li>
                      <li>
                        <a className="text-error" onClick={() => handleRemoveFriend(friend._id)}>
                          <UserMinus size={16} />
                          Remove Friend
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
    
  )
}


function FriendSuggestionItem({ friend ,handleSendRequest }:any) {

  const [erase, seterase] = useState(false)

  // useEffect(() => {
  //   console.log(friend)
  // }, [])


  

  return (
    <motion.div >
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={  friend.profilePic} alt={friend.username} />
            </div>
          </div>
          <div>
            <p className="font-medium">{friend.username}</p>
            <p className="text-xs text-gray-500">
              You Both From Same College
            </p>
          </div>
        </div>

        
          <motion.button className={`btn  btn-[#E0E0E0] ${friend.requestStatus === "pending"?"btn-success" : ""}`} btn-sm animate={{color:"#FFFFFF"}} onClick={() => { handleSendRequest(friend._id , seterase)}}>
            {
              erase || friend.requestStatus === "pending" ?
              
              <Check size={16}/>
              : 
              <UserPlus  size={16} />
            }
          </motion.button>
        {/* )} */}
      </div>
    </motion.div>
  );
}
