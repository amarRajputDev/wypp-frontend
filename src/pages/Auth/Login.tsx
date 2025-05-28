import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/boy-8515623_1920.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useUserStore from "../../store/authStore";
// import { toast } from "react-toastify";

function Login() {
  const url = import.meta.env.VITE_API_URL
  const {setUser} = useUserStore()

  const navigation = useNavigate()
const [Error, setError] = useState("")
  const [Data, setData] = useState({
    username: "",
    password: "",
  });

  const validation = () =>{
    if (Data.username.length < 1) {
      setError("Username is required")
      return false
    }
    if (Data.password.length < 1) {
         setError("password is required")
         return false
    }
    return true
  }

  


  //TODO: handle Login
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const isValidate = validation();
    if (isValidate) {
      
      try {
        await axios.post(`${url}/user/login` , Data , {withCredentials :true})
        .then((res)=>{
          console.log(res.data)
          toast.success(res.data.message)
          setUser(res.data.userData)
          navigation("/home")

        }).catch((err)=>{
          console.log(err.response.data.message)
          toast.error(err.response.data.message)
        })
        
      } catch (err: any) {
        console.error("Login Error:", err);
      }
    }

  };

  return (
    <>
      <div className=" w-screen h-screen flex justify-center items-center p-10 bg-[#DDE5F4] ">
        <div className="  border p-10 rounded-3xl max-w-[400px] bg-white/50 backdrop-blur-2xl">
          <img src={logo} alt="" className="h-[10vh] m-auto" />
          {/* <h1 className=" text-center font-bold text-3xl">Login To Connect</h1> */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="@amar324"
              value={Data.username}
              onChange={(e) => setData({ ...Data, username: e.target.value })}
              className="input w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="********"
              className="input w-full max-w-xs"
              onChange={(e) => setData({ ...Data, password: e.target.value })}

            />
          </label>

          <span className=" text-red-500">{Error}</span> <br />

          <Link to={"/signup"} className=" text-blue-500 text-[10px]">
            Dont Have Account?
          </Link>

          <button
            onClick={handleLogin}
            className="btn bg-[#3E4684] text-white w-full mt-5"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
