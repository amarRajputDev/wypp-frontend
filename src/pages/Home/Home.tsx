// import { useEffect } from "react"
import { useEffect, useState } from "react"
// import NavbarHome from "../../components/NavbarHome"
import PostContainer from "../../components/PostContainer"
import Sidebar from "../../components/SideBar"
import { Plus } from "lucide-react"
import { motion } from "motion/react"
import axios from "axios"
import { toast } from "react-toastify"
import useUserStore from "../../store/authStore"
import { useNavigate } from "react-router-dom"


const url = import.meta.env.VITE_API_URL
function Home() {


  const { isLogin} = useUserStore()
  const navigation = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigation("/")
    }
  }, [])
  

  return (
    <>
    <UploadPostModal/>
      {/* <NavbarHome/> */}
    <div className=" flex bg-[#F7F5EB] overflow-hidden">
      <Sidebar/>
      <div className=" h-[calc(100vh-150px)] w-[2px] bg-base-300 my-auto "></div>
      <div className=" bg-[#F7F5EB] w-full">
     
        <PostContainer/>

      </div>
    </div>
    </>
  )
}

export default Home


function UploadPostModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false)

  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be under 10MB");
        setFile(null);
      } else {
        setError("");
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and Description are required!");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("image", file);
    }
    formData.append("tags", JSON.stringify(tags));
    
    setloading(true)

    const response = await axios.post(`${url}/uploads/post`, formData ,{withCredentials:true})

    if (response.status===201) {
      setloading(false)
      toast.success("Post Uploaded Successfully")
    }else{
      toast.error(response.data.message)
    }


    console.log("Uploading:", { title, description, tags, file });
    setIsOpen(false); // Close modal after submitting
  };

  return (
    <div className={`flex fixed   z-10 justify-center items-center ${isOpen ? "backdrop-blur-2xl h-screen w-screen" : ""} duration-300 `}>
      {/* Button to open modal */}
      <div onClick={() => setIsOpen(true)} className="bg-blue-500 fixed text-white px-4 py-2 rounded-full bottom-24 right-5">
        <Plus />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10   bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-lg p-6 w-96 shadow-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Post</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 text-xl">
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded h-20"
                required
              ></textarea>

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                required
              />

              {/* Show preview if file exists */}
              {file && (
                <div className="mt-2">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                    />
                  ) : (
                    <video controls className="w-full h-40 rounded">
                      <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                  )}
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                
                {
                  loading ? (
                    <span className="loading loading-dots loading-xl"></span>
                  ) : (
                    "Upload"
                  )
                }
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}