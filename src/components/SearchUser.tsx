import axios from 'axios'
import { Search } from 'lucide-react'
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

function SearchUser() {
    const [searchText, setsearchText] = useState("")
    const [users, setusers] = useState([])

    const handleSearch = async() =>{
        const Response = await axios.get(`${import.meta.env.VITE_API_URL}/user/searchuser/${searchText}`)

        setusers(Response.data.users)
        console.log(Response.data.users)

    }

    useEffect(() => {
      if (!searchText) return
        // console.log()
      handleSearch()
    }, [searchText])
    
  return (
    <div>
      {/* The button to open modal */}
<label 
htmlFor="my_modal_6"
          className=" border flex px-2 py-1 rounded-full bg-[#EDE9D5] border-[#D4CBB8] ">
            <div className=' w-full  text-[#3D3D3D] px-1'>
                <h1>Search User...</h1>

            </div>
            <Search/>
          </label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal overflow-y-auto z-50 "  role="dialog">
  <div className="modal-box  ">
    

  <div 
          className=" border flex px-2 py-1 rounded-full bg-[#EDE9D5] border-[#D4CBB8] ">
            <input
              type="text"
              placeholder=" Search... "
              value={searchText}
              className=" w-full border-0 outline-0 text-[#3D3D3D] "
              onChange={(e) => {
                setsearchText(e.target.value)
                // handleSearch()
              }}
            />
            <Search />
          </div>

          {
            users.map((user:any)=>(

                <User key={user._id} user={user} />
            ))
          }




    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
    </div>
  )
}


const User = ({user}:any) =>{

    const navigate = useNavigate()

    // const user = {
    //     email: "amar@amar.com",
    //     fullname:"Amar Rajput",
    //     profilePic:"https://avatar.iran.liara.run/public/boy?username=amarlodhi",
    //     _id:"67dad396a65ef1b3adeb0453",
    //     username:"amarlodhi"

    // }

    return(
        <>

        <div 
        className=' rounded-4xl w-full flex p-2 gap-3 bg-[#EDE9D5] hover:bg-[#8b8a82] duration-200 cursor-pointer mt-2 '
        onClick={()=>navigate(`/user/${user._id}`)}
        >
            <div className=''>
                <img src={user.profilePic} className=' size-10 rounded-full' alt="" />
            </div>
            <div className=''>
                <h1 className=' font-semibold tracking-tighter leading-none'>{user.fullName}</h1>
                <h2 className=' text-slate-800 text-sm'>@{user.username}</h2>
            </div>

        </div>

        </>
    )
}

export default SearchUser
