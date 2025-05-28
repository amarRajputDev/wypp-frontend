import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import StoriesContainer from "./StoriesContainer"
import axios from "axios";
import { toast } from "react-toastify";
import { user } from "../../types";

interface Post {
  _id:string,
  user:user,
  title:string,
  score:number,
  likes:string[],
  image:string,
  content:string,
  comments:string[],
  tags:string[]
}

function PostContainer() {
  const [isLoading, setisLoading] = useState(true)

    
    const [Posts, setPosts] = useState<Post[] | []>([])

    useEffect(() => {

      const fetchPosts = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/uploads/Feed`, { withCredentials: true });
          setPosts(res.data);
          console.log("Posts", res.data);
    
         
            setisLoading(false);
          
    
          
        } catch (error) {
          console.log("Error in fetching Posts", error);
          toast.error("Error in Fetching Posts");
        }
      };
     
      fetchPosts();
    }, []);
    
      
      
      

      
  return (
    <div className=" ">
         <div className="w-full  h-[90vh] bg-accent  rounded-lg  overflow-y-auto scrollbar-thin scrollbar-thumb-[#B95B45] scrollbar-track-[#F7F5EB]">
        <StoriesContainer/>
        <div className=" w-full flex flex-col items-center gap-2 mt-2">

        {
          isLoading?
          <>
            <div className="skeleton border w-[500px] h-[300px] border-gray-200 rounded-lg shadow-lg p-4 max-w-md"></div>
            <div className=" skeleton border w-[500px] h-[300px] border-gray-200 rounded-lg shadow-lg p-4 max-w-md"></div>
          </>
    :

            Posts.map((item)=>(
              item &&

                <PostCard key={item._id} title={item.title} description={item.content} image={item.image} tags={item.tags} profileImage={item.user.profilePic} author={item.user?.username} likes={item.likes.length || 0} comments={item.comments.length || 0} shares={item.shares || 0} />
              
            ))

        }
        </div>
     
    </div>
      
    </div>
  )
}

export default PostContainer
