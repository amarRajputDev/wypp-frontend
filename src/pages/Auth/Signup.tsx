import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/boy-8515623_1920.png";

interface FormData {
  // Personal Details
  fullName: string;
  username: string;
  gender: string;
  address: string;
  age: string;
  // Educational Details
  collegeName: string;
  courseName: string;
  courseDuration: string;
  yearOfStudy: string;
  personality: string;
  interests: string;
  // Account Details
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  fullName?: string;
  username?: string;
  gender?: string;
  address?: string;
  age?: string;
  collegeName?: string;
  courseName?: string;
  courseDuration?: string;
  yearOfStudy?: string;
  personality?: string;
  interests?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function Signup() {
  const [step, setStep] = useState<number>(1);
  const [isFocusCollgeNage, setisFocusCollgeNage] = useState(false)
  const [isFocusCourseName, setisFocusCourseName] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    gender: "",
    address: "",
    age: "",
    collegeName: "",
    courseName: "",
    courseDuration: "",
    yearOfStudy: "",
    personality: "",
    interests: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [collegesData, setcollegesData] = useState<any[]>([])
  const [CoursesData, setCoursesData] = useState<any[]>([])

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigation = useNavigate();

  useEffect(() => {
    if (formData.collegeName === "") {
      return
    }

    const collegesName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/colleges/searchCollegeName?search=${formData.collegeName}`);
        // console.log(response);
        setcollegesData(response.data)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    collegesName();
   
  }, [formData.collegeName])



  useEffect(() => {
    if (formData.collegeName === "") {
      return
    }
    const courses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/colleges/searchCourseName?search=${formData.courseName}`);
        // console.log(response);
        setCoursesData(response.data)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    courses();
   
  }, [formData.courseName])
  

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) < 16 || parseInt(formData.age) > 100) {
      newErrors.age = "Age must be between 16 and 100";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = "College name is required";
    }

    if (!formData.courseName.trim()) {
      newErrors.courseName = "Course name is required";
    }

    if (!formData.courseDuration) {
      newErrors.courseDuration = "Course duration is required";
    }

    if (!formData.yearOfStudy) {
      newErrors.yearOfStudy = "Year of study is required";
    }

    if (!formData.personality) {
      newErrors.personality = "Please select your personality type";
    }

    if (!formData.interests.trim()) {
      newErrors.interests = "Please share your interests";
    } else if (formData.interests.length < 10) {
      newErrors.interests = "Please provide more details about your interests";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep3()) {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/user/signup",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Ensures JWT cookies are stored
          }
        );
  
        console.log("Signup Response:", res);
  
        if (res.status === 201) {
          toast.success(res.data.message || "Signup successful!");
          navigation("/home");
        } else {
          toast.error(res.data.message || "Signup failed!");
        }
      } catch (error: any) {
        console.error("Signup error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      }
    }
  };
  

  const renderStepContent = () => {
    return (
      <motion.div
        key={step}
        initial={{ opacity: 0, x: step > 1 ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: step > 1 ? -100 : 100 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {step === 1 && (
          <>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`input input-bordered w-full ${
                  errors.fullName ? "input-error" : ""
                }`}
                required
              />
              {renderError("fullName")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`input input-bordered w-full ${
                  errors.username ? "input-error" : ""
                }`}
                required
              />
              {renderError("username")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <div className="flex gap-4">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Female</span>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="radio checked:bg-pink-500"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Male</span>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="radio checked:bg-blue-500"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">Other</span>
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleInputChange}
                      className="radio checked:bg-purple-500"
                    />
                  </label>
                </div>
              </div>
              {renderError("gender")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={`input input-bordered w-full ${
                  errors.age ? "input-error" : ""
                }`}
                required
              />
              {renderError("age")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`input input-bordered w-full ${
                  errors.address ? "input-error" : ""
                }`}
                required
              />
              {renderError("address")}
            </div>
            <Link to={"/login"} className=" text-blue-500 text-[10px]">
              Already Have an Account?
            </Link>

            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary w-full"
            >
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="form-control relative w-full">
              <label className="label">
                <span className="label-text">College Name</span>
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                onFocus={() => setisFocusCollgeNage(true)}
                onBlur={() => setisFocusCollgeNage(false)}
                className={`input input-bordered w-full ${
                  errors.collegeName ? "input-error" : ""
                }`}
                required
              />
              {renderError("collegeName")}
                

                {/* //DROPDOWN */}
              <div className={`rounded-2xl absolute z-10 w-full bg-base-200 shadow-2xl border p-2 ${isFocusCollgeNage ? "" : "hidden"} ${collegesData.length === 0 ? " hidden" : "" }`} >

              {
                collegesData.map((college)=>(
                  <div 
                  className=" w-full p-2 hover:bg-base-100 rounded-xl cursor-pointer "
                  onMouseDown={()=>setFormData({...formData , collegeName : college.name})}
                  >
                <h1>{college.name}</h1>
              </div>

                ))
              }
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Course Name</span>
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                onFocus={() => setisFocusCourseName(true)}
                onBlur={() => setisFocusCourseName(false)}
                className={`input input-bordered w-full ${
                  errors.courseName ? "input-error" : ""
                }`}
                required
              />
              {renderError("courseName")}

              {/* //DROPDOWN */}
              <div className={`rounded-2xl absolute z-10 w-full bg-base-200 shadow-2xl border p-2 ${isFocusCourseName ? "" : "hidden"} ${CoursesData.length === 0 ? " hidden" : "" }`} >

              {
                CoursesData.map((course)=>(
                  <div 
                  key={course.id}
                  className=" w-full p-2 hover:bg-base-100 rounded-xl cursor-pointer "
                  onMouseDown={()=>{setFormData({...formData , courseName : course.name})
                }}
                  >
                <h1>{course.name}</h1>
              </div>

                ))
              }
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Course Duration</span>
              </label>
              <select
                name="courseDuration"
                value={formData.courseDuration}
                onChange={handleInputChange}
                className={`select select-bordered w-full ${
                  errors.courseDuration ? "select-error" : ""
                }`}
                required
              >
                <option disabled selected value="">Select Duration</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
              </select>
              {renderError("courseDuration")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Current Year of Study</span>
              </label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleInputChange}
                className={`select select-bordered w-full ${
                  errors.yearOfStudy ? "select-error" : ""
                }`}
                required
              >
                <option disabled selected value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </select>
              {renderError("yearOfStudy")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Personality Type</span>
              </label>
              <select
                name="personality"
                value={formData.personality}
                onChange={handleInputChange}
                className={`select select-bordered w-full ${
                  errors.personality ? "select-error" : ""
                }`}
                required
              >
                <option disabled selected value="">
                  Select Personality Type
                </option>
                <option value="introvert">
                  Introvert - I prefer smaller groups and quiet environments
                </option>
                <option value="extrovert">
                  Extrovert - I thrive in social situations and large groups
                </option>
                <option value="ambivert">
                  Ambivert - I'm balanced between social and quiet time
                </option>
              </select>
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Choose the option that best describes you
                </span>
              </label>
              {renderError("personality")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Interests & Hobbies</span>
              </label>
              <textarea
                name="interests"
                rows={3}
                value={formData.interests}
                onChange={handleInputChange}
                className={`textarea textarea-bordered w-full ${
                  errors.interests ? "textarea-error" : ""
                }`}
                placeholder="What do you like to do?"
                required
              />
              {renderError("interests")}
            </div>
            <Link to={"/login"} className=" text-blue-500 text-[10px]">
              Already Have an Account?
            </Link>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-outline flex-1"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary flex-1"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="amar@mail.com"
                required
              />
              {renderError("email")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="*********"
                required
              />
              {renderError("password")}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`input input-bordered w-full ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
                placeholder="*********"
                required
              />
              {renderError("confirmPassword")}
              <Link to={"/login"} className=" text-blue-500 text-[10px]">
                Already Have an Account?
              </Link>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-outline flex-1"
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary flex-1">
                Sign up
              </button>
            </div>
          </>
        )}
      </motion.div>
    );
  };

  const renderError = (fieldName: keyof ValidationErrors) => {
    return errors[fieldName] ? (
      <label className="label">
        <span className="label-text-alt text-error">{errors[fieldName]}</span>
      </label>
    ) : null
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <img src={logo} alt="" className="h-[10vh] m-auto mt-3" />
          <h2 className="card-title text-3xl font-bold text-center justify-center">
            Create your account
          </h2>
          <div className="text-center text-sm text-base-content/60">
            Step {step} of 3 <br />
            <ul className="steps">
              <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Personal Details</li>
              <li className={`step ${step >= 2 ? "step-primary" : ""}`}>College Details</li>
              <li className={`step ${step >= 3 ? "step-primary" : ""}`}>end</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            {renderStepContent()}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
