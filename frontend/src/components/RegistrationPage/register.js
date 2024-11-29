import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registrationImage from "../../assets/registrationImage.avif";
import logo from "../../assets/logo.png";
import "./index.css";

function UserRegister() {
  const navigate=useNavigate();
  const { register, handleSubmit, watch,formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [pic,setPic]=useState();
  const [picLoading,setPicLoading]=useState();
  const [resume, setResume] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(false);

  const onSubmit = async  (dat) => {
    const user = dat;
    
    // Create userData with userType
    const userData = {
      username: user.username,
      email: user.email,
      password: user.password,
      userType: user.userType, // Make sure this is included
    };
    if (resumeLoading) {
      setErrorMsg("Please wait for the resume to finish uploading.");
      return;
    }    
    // For JobSeeker, include resumeUrl
    if (user.userType === "JobSeeker") {
      
      userData.resumeUrl = resume;
    }
    // For Recruiter, include company details
    if (user.userType === "Recruiter") {
      userData.companyName = user.companyName;
      userData.companyImageUrl = pic;
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    const registerUrl = user.userType === "JobSeeker" 
      ? "/user-api/register" 
      : "/recruiter-api/register";
  
    try {
      const response = await fetch(registerUrl, options);
      
      if (response.status === 200) {
        throw new Error("User with the same email already exists.");
      }
      
      const data = await response.json();
      
      if (response.status === 400) {
        throw new Error(data.message || "Registration failed.");
      }
      
      toast.success('Registered successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      navigate("/", { replace: true });
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const postResume = (resumeFile) => {
    setResumeLoading(true);
    // Validate file type - JPEG or PNG
    if (!resumeFile) {
      setErrorMsg("No file selected");
      setResumeLoading(false);
      return;
    }
    if (resumeFile.type !== "image/jpeg" && resumeFile.type !== "image/png") {
      setErrorMsg("Only JPEG and PNG files are allowed for resume upload.");
      setResumeLoading(false);
      return;
    }
    const data = new FormData();
    data.append("file", resumeFile);
    data.append("upload_preset", "Joblistingportal");
    data.append("cloud_name", "dy8oqvlyy");
    fetch("https://api.cloudinary.com/v1_1/dy8oqvlyy/image/upload", {
      method: "post",
      body: data,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.url.toString())
      setResume(data.url.toString());
      setResumeLoading(false);
      setErrorMsg("");
    })
    .catch((err) => {
      console.log(err);
      setErrorMsg("Resume upload failed");
      setResumeLoading(false);
    });
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    //raise error is pic not seletcted
    if (pics === undefined) {
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Joblistingportal");
      data.append("cloud_name", "dy8oqvlyy");
      fetch("https://api.cloudinary.com/v1_1/dy8oqvlyy/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      setPicLoading(false);
      return;
    }
  };

  const userType = watch("userType");
  return (
    <div className="register-container">
      <div className="user-register-page">
        <div className="user-register-page-image-container">
          <img alt="job" className="register-page-image" src={registrationImage} />
        </div>
        <div className="user-register-page-form-container">
          <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="logo-container">
              <img className="website-logo" src={logo} alt="app-logo"/>
            </div>
            <div className="user-input-container">
              <label className="user-register-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="user-register-element"
                {...register("username", { required: "*Username is required" })}
              />
              {errors.username && <p className="error-message">{errors.username.message}</p>}
            </div>
            <div className="user-input-container">
              <label className="user-register-label" htmlFor="email">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="user-register-element"
                {...register("email", { required: "*Email is required" })}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="user-input-container">
              <label className="user-register-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="user-register-element"
                {...register("password", { required: "*Password is required" })}
              />
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div className="user-input-container">
              <label className="user-register-label" htmlFor="user-type">
                USER-TYPE
              </label>
              <select
                {...register("userType", {
                  required: "*User type is required",
                  validate: (value) =>
                    value === "Recruiter" || value === "JobSeeker" || "*Please select a valid user type",
                })}
                className="types-list-container"
                defaultValue=""
                >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="Recruiter">Recruiter</option>
                <option value="JobSeeker">Job Seeker</option>
              </select>

              {errors.userType && <p className="error-message">{errors.userType.message}</p>}
            </div>
            
            {userType === "JobSeeker" && (
              <div className="user-input-container">
                <label className="user-register-label" htmlFor="resumeUpload">
                  RESUME (JPEG/PNG ONLY)
                </label>
                <input
                  type="file"
                  id="resumeUpload"
                  name="resumeUpload"
                  className="user-register-element"
                  onChange={(e) => postResume(e.target.files[0])}
                />
                {resume && <p className="success-message">Resume uploaded successfully</p>}
              </div>
            )}
            {userType === "Recruiter" && (
              <>
                <div className="user-input-container">
                  <label className="user-register-label" htmlFor="companyName">
                    COMPANY-NAME
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="user-register-element"
                    {...register("companyName", { required: "*Company name is required" })}
                  />
                  {errors.companyName && <p className="error-message">{errors.companyName.message}</p>}
                </div>
                <div className="user-input-container">
                  <label className="user-register-label" htmlFor="companyImageUrl">
                    COMPANY IMAGE 
                  </label>
                  <input
                    type="file"
                    id="companyImageUrl"
                    name="companyImageUrl"
                    className="user-register-element"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </div>
              </>
            )}

            <div className="register-page-button-container">
              <button type="submit" className="register-button" >
                {picLoading?"image uploading please wait!!":"Register"}
              </button>
              <p className="already-have-account">
                Already have an account? <Link to={"/"}><span className="got-to-login-link">Login here</span>
                </Link>
              </p>
            </div>
            {errorMsg!=="" && <p className="errormessage">{errorMsg}</p>}
          </form>
        </div>

      </div>
    </div>
  );
}

export default UserRegister;