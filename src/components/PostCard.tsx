import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Comment, Post } from '../types/Post';
import axios from "axios";
import useUserStore from "../store/authStore";
import { toast } from "react-toastify";

// const comment ={
//   id: "",
//   text: "",
// }

const PostCard: React.FC<Post> = ({
  id,
  title,
  description,
  tags,
  image,
  profileImage,
  author,
  likes,
  comments,
  shares,
}) => {

  const {userData} = useUserStore(); // Assuming you have a user store to get the current user data
  const [likeCount, setLikeCount] = useState(likes.length);
  const isliked = likes.includes(userData!._id); // Assuming 'author' is the current user's identifier
  const [isLiked, setIsLiked] = useState(isliked);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [Comments, setComments] = useState<Comment[]>([])

  function generateRandomId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

  // Handle Like Click
  const handleLike = async() => {
    if (!isLiked) {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/uploads/incLike/${id}`, { withCredentials: true }); 
      console.log(response); 
      if (response.status !== 200) {
        console.error("Failed to update like count");
        return;
      }
    }
    else{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/uploads/decLike/${id}`, { withCredentials: true });
      console.log(response); 

      if (response.status !== 200) {
        console.error("Failed to update dislike count");
        return;
      }
    }
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  // Toggle Comment Box
  const toggleCommentBox = () => {
   
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/uploads/getComment/${id}`, { withCredentials: true });
        if (response.status === 200) {
          // Assuming the response contains the comments count
          setCommentText(""); // Clear the comment input
          setComments(response.data.comments); // Assuming response.data.comments is an array of comments
          console.log(response.data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {

        console.error("Error fetching comments:", error);
      }
    }

    if (!showCommentBox) {
      fetchComments(); // Fetch comments only when opening the comment box  
    }
     setShowCommentBox(!showCommentBox);
  };

  const addComment = async () => {
    if (commentText.trim() === "") return; // Prevent empty comments

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploads/postComment/${id}`,
        { comment: commentText },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Comment added successfully!");
        setCommentText(""); // Clear the comment input
        setComments((prevComments : any) => [
          ...prevComments,
           {id:generateRandomId() , content: commentText, user: { username: userData?.username, profilePic: userData?.profilePic } }
        ]);
        // Optionally, you can update the comments count or fetch new comments here
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  return (
    <div className="bg-white border w-full md:w-[500px] border-gray-200 rounded-lg shadow-lg p-4 ">
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={profileImage || "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png"}
          alt="Author"
          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
        />
        <span className="font-semibold text-gray-700">@{author}</span>
      </div>

      {/* Conditionally Render Image */}
      {image && (
        <img
          src={image}
          alt="Post"
          className=" m-auto h-48 object-contain border border-gray-300 rounded-lg"
        />
      )}

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mt-3">{title}</h2>

      {/* Description */}
      <p className="text-gray-600 mt-2">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-2 py-1 text-sm rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Like, Comment, Share Section */}
      <div className="flex justify-between items-center mt-4 text-gray-600">
        <button
          className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "hover:text-red-500"}`}
          onClick={handleLike}
        >
          <Heart className="w-5 h-5" fill={isLiked ? "red" : "none"} />
          {likeCount}
        </button>

        <button
          className="flex items-center gap-1 hover:text-blue-500"
          onClick={toggleCommentBox}
        >
          <MessageCircle className="w-5 h-5" />
          {comments}
        </button>

        <button className="flex items-center gap-1 hover:text-green-500">
          <Share2 className="w-5 h-5" /> {shares}
        </button>
      </div>

      {/* Animated Comment Box */}
      {showCommentBox && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 "
        >
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={addComment} className="bg-blue-500 text-white px-4 py-1 rounded-lg mt-2 hover:bg-blue-600">
            Post Comment
          </button>
          <div className={`max-h-[300px] overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-sm ${Comments.length > 0 ? "mt-3" : "hidden"}`}>
            {Comments.length > 0 && Comments.map(
              (comment : Comment) => (
                <UsersComment key={comment._id} comment={comment} />
              )
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};



function UsersComment({ comment } : { comment: Comment }) {
  return (
    <div className="flex items-start gap-3 bg-[#EDE9D5] rounded-xl p-3 shadow-sm mt-2">
      {/* Profile Image */}
      <img
        src={comment?.user?.profilePic || "https://avatar.iran.liara.run/public/boy"}
        alt="User"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Comment Info */}
      <div>
        <h2 className="font-semibold text-sm text-[#3D3D3D]">
          {comment?.user?.username || "Unknown"}
        </h2>
        <p className="text-sm text-slate-800">{comment.content}</p>
      </div>
    </div>
  );
}

export { UsersComment};


export default PostCard;
