import React, { useEffect, useState } from 'react'
import NavbarHome from '../../components/NavbarHome'
import MobileNav from '../../components/MobileNav'
import FriendsList from './FriendList'
import axios from 'axios'
import useUserStore from '../../store/authStore'

interface User {
    _id:string,
    username:string,
    profilePic:string
}

interface Request {
    createdAt:string,
    receiver:User,
    sender:string,
    _id:string
  }
  

function FriendsPage() {
    const {userData} =useUserStore()
    const [receiveRequest, setreceiveRequest] = useState<Request[]| []>([])
    const [requestSended, setrequestSended] = useState<Request[] | []>([])

    useEffect(() => {
        if (!userData?._id) return; // Prevent API call if userData is not available
    
        const fetchRequests = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/friends/requests/${userData._id}`);
                setreceiveRequest(res.data.receivedRequests)
                setrequestSended(res.data.sentRequests)
                console.log( "friends page",res.data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };
    
        fetchRequests();
    }, [userData?._id]);
    
  return (
    <div>
        <MobileNav/>
        <FriendsList  incomingRe={receiveRequest} outgoingRe={requestSended}/>
      
    </div>
  )
}

export default FriendsPage
