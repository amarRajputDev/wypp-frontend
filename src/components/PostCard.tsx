import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Post } from '../types/Post';

const PostCard: React.FC<Post> = ({
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
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Handle Like Click
  const handleLike = () => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  // Toggle Comment Box
  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  return (
    <div className="bg-white border w-[500px] border-gray-200 rounded-lg shadow-lg p-4 max-w-md">
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
          className="mt-4"
        >
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mt-2 hover:bg-blue-600">
            Post Comment
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PostCard;
